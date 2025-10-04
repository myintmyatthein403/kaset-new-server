import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // ConfigService ကို ဒီလိုပဲ Import လုပ်ရမည်
import * as aesEcb from 'aes-ecb';
import { sha256 } from 'js-sha256';
import { PAYMENT_STATUS } from 'src/common/enums/enums';
import { OrdersService } from 'src/modules/order-services/orders/orders.service';
import { DingerLogService } from '../dinger-log/dinger-log.service';

@Injectable()
export class CheckoutService {
  private readonly SECRET_KEY: string;

  constructor(
    private readonly configService: ConfigService,

    private readonly orderService: OrdersService,
    private readonly dingerLogService: DingerLogService,
  ) {
    const secretKey = this.configService.get<string>('DINGER_CALLBACK_KEY');

    if (!secretKey) {
      // Key မရှိပါက Server စတင်ချိန်တွင် Error ပြပါ။
      throw new Error('DINGER_CALLBACK_KEY is not defined in environment variables or configuration.');
    }
    this.SECRET_KEY = secretKey;
  }

  async handleDingerCallback(body: { paymentResult: string; checksum: string }) {
    const { paymentResult: cipherText, checksum: dingerChecksum } = body;

    if (!cipherText || !dingerChecksum) {
      throw new BadRequestException('Missing paymentResult or checksum.');
    }

    let resultJsonString: string;
    let transactionData: any;

    try {
      resultJsonString = aesEcb.decrypt(this.SECRET_KEY, cipherText);

      transactionData = JSON.parse(resultJsonString);
    } catch (error) {
      console.error('Decryption or JSON Parsing Error:', error);
      throw new BadRequestException('Decryption failed or data format is invalid.');
    }

    const localChecksum = sha256(resultJsonString);

    if (localChecksum !== dingerChecksum) {
      console.error(`Checksum FAILED. Local: ${localChecksum}, Dinger: ${dingerChecksum}`);
      throw new UnauthorizedException('Checksum verification failed.');
    }

    console.log('Checksum SUCCESS. Transaction Data:', transactionData);

    const { transactionStatus, merchantOrderId, totalAmount, transactionId, methodName, providerName } = transactionData;

    // ** Database Logic **

    if (transactionStatus === 'SUCCESS') {
      this.orderService.updatePaymentStatus(transactionId, PAYMENT_STATUS.PAID)
      this.dingerLogService.createDingerLog(transactionId, {
        method: methodName,
        provider: providerName,
        status: PAYMENT_STATUS.PAID,
        amount: Number(totalAmount)
      })

      console.log(`Order ${merchantOrderId} processing as SUCCESS.`);

      return 'SUCCESS';
    } else {
      this.orderService.updatePaymentStatus(transactionId, PAYMENT_STATUS.FAILED)
      this.dingerLogService.createDingerLog(transactionId, {
        method: methodName,
        provider: providerName,
        status: PAYMENT_STATUS.FAILED,
        amount: Number(totalAmount)
      })

      console.warn(`Order ${merchantOrderId} processing as FAILED. Status: ${transactionStatus}`);

      return 'SUCCESS (Processed Fail Status)'; // Dinger ကို HTTP 200 ပြန်ပေးရန်
    }
  }
}
