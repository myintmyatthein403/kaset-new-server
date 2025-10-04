import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentLogDto } from './dto/create-payment-log.dto';
import { UpdatePaymentLogDto } from './dto/update-payment-log.dto';
import { PAYMENT_STATUS } from 'src/common/enums/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentLog } from './entities/payment-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentLogService {
  constructor(
    @InjectRepository(PaymentLog)
    private readonly paymentLogRepository: Repository<PaymentLog>,
  ) { }

  create(createPaymentLogDto: CreatePaymentLogDto) {
    return 'This action adds a new paymentLog';
  }

  findAll() {
    return `This action returns all paymentLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentLog`;
  }

  update(id: number, updatePaymentLogDto: UpdatePaymentLogDto) {
    return `This action updates a #${id} paymentLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentLog`;
  }

  async createPaymentLog(sessionId: string, status: PAYMENT_STATUS) {
    const stripeLog = await this.paymentLogRepository.findOne({
      where: {
        transaction_id: sessionId,
        status: PAYMENT_STATUS.PENDING,
      }
    })

    if (!stripeLog) {
      throw new BadRequestException(`Session not found or already processed`)
    } else {
      const newStripeLog = this.paymentLogRepository.create({
        transaction_id: sessionId,
        orderId: stripeLog.orderId,
        customerId: stripeLog.customerId,
        method: stripeLog.method,
        provider: stripeLog.provider,
        amount: stripeLog.amount,
        status,
      })
      return await this.paymentLogRepository.save(newStripeLog);
    }
  }

}
