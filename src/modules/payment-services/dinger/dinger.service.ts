import { Injectable } from '@nestjs/common';
import { CreateDingerDto } from './dto/create-dinger.dto';
import { UpdateDingerDto } from './dto/update-dinger.dto';
import axios, { AxiosInstance } from 'axios';
import { PAYMENT_METHOD } from 'src/common/enums/enums';
import * as NodeRSA from 'node-rsa';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';

@Injectable()
export class DingerService {
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly projectName: string;
  private readonly apiKey: string;
  private readonly merchantName: string;
  private readonly pubKey: string;

  constructor(
    private readonly configService: ConfigService
  ) {
    const baseUrl = this.configService.get<string>('DINGER_BASE_URL');
    const projectName = this.configService.get<string>('DINGER_PROJECT_NAME');
    const apiKey = this.configService.get<string>('DINGER_API_KEY');
    const merchantName = this.configService.get<string>('DINGER_MERCHANT_NAME');
    const pubKey = this.configService.get<string>('DINGER_PUB_KEY');
    if (!baseUrl || !projectName || !apiKey || !merchantName || !pubKey) {
      throw new Error('DINGER_BASE_URL or DINGER_PROJECT_NAME is missing in environment configuration.');
    }
    this.baseUrl = baseUrl;
    this.projectName = projectName;
    this.apiKey = apiKey;
    this.merchantName = merchantName;
    this.pubKey = pubKey;
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
    })
  }

  public async getDingerToken() {
    const endpoint = '/api/token';
    try {
      const response = await this.httpClient.get(endpoint, {
        params: {
          projectName: this.projectName,
          apiKey: this.apiKey,
          merchantName: this.merchantName,
        }
      });
      return response.data.response.paymentToken
    } catch (error) {
      console.error('Error fetching Dinger token:', error);
      throw new Error('Failed to retrieve Dinger access token.');
    }
  }

  public async Pay(orderData: any) {
    const endpoint = "/api/pay"
    //const items = `[{\"name\":\"Dinger\\'s\",\"amount\": ${totalAmount},\"quantity\":\"1\"}]`;
    const items = orderData.orderItems.map((item: any) => {
      return {
        name: `${item.product.name}-${item.variation.size}-${item.variation.color_name}`,
        amount: orderData.paymentMethod == 'card' ? Number(item.variation.price) : Number(item.variation.price) * orderData.rate,
        quantity: item.quantity
      }
    })

    const paymentToken = await this.getDingerToken();

    const totalAmount = orderData.orderItems.reduce((sum: number, item: any) => {
      return sum + (Number(item.variation.price) * item.quantity);
    }, 0);

    const customerPhone = orderData.shippingAddress.phone_number;
    const customerName = "Myint Myat Thein";
    const description = `Order ${orderData.order_number} from ${this.projectName}`;
    const customerAddress = orderData.shippingAddress.address;
    const orderId = new Date();

    const data = JSON.stringify({
      providerName: 'KBZ Pay',
      methodName: 'QR', // Assuming PWA is the correct method name
      orderId: orderId,
      customerPhone: customerPhone,
      customerName: customerName,
      description: description,
      customerAddress: customerAddress,
      totalAmount: orderData.paymentMethod == "card" ? totalAmount : totalAmount * orderData.rate,
      items: JSON.stringify(items)
    });
    console.log(data)

    //const data = "{providerName: 'KBZ Pay',methodName: PWA,orderId: 'hnt-110920210022',customerPhone: '959402728583',customerName: 'Myint Myat Thein', description:'Dinger Campaign Test',customerAddress:'Yangon, Myanmar' ,totalAmount: 500,items:'[{\"name\":\"Dinger\",\"amount\":\"500\",\"quantity\":\"1\"}]'}"


    const pubKey = "-----BEGIN PUBLIC KEY-----\n" +
      this.pubKey + "\n"
    "-----END PUBLIC KEY-----";

    const publicKey = new NodeRSA();
    publicKey.importKey(pubKey, 'pkcs8-public')
    publicKey.setOptions({ encryptionScheme: 'pkcs1' })
    const encrytpStr = publicKey.encrypt(data, 'base64')
    console.log("encrytpStr " + encrytpStr)

    const options = {
      method: 'POST',
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        authorization: `Bearer ${paymentToken}`,
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
      },
      data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="payload"\r\n\r\n' + encrytpStr + '\r\n-----011000010111000001101001--\r\n\r\n'
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      return data?.response;
    } catch (error) {
      console.error(error);
    }
  }
}
