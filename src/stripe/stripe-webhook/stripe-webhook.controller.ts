import { Controller, Post, Headers, Req, HttpCode } from '@nestjs/common';
import { PAYMENT_STATUS } from 'src/common/enums/enums';
import { OrdersService } from 'src/modules/order-services/orders/orders.service';
import { PaymentLogService } from 'src/modules/payment-services/payment-log/payment-log.service';
import { StripeLogService } from 'src/modules/payment-services/stripe-log/stripe-log.service';
import Stripe from 'stripe';

@Controller('stripe-webhook') // **သီးခြား Route Path**
export class StripeWebhookController {
  private readonly stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(
    private readonly orderService: OrdersService,
    private readonly paymentLogService: PaymentLogService,
    private readonly stripeLogService: StripeLogService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  }

  @Post()
  @HttpCode(200)
  async handleWebhook(@Headers('stripe-signature') signature: string, @Req() req: any) {
    let event: Stripe.Event;
    const rawBody = req.rawBody;
    console.log('rawBody', rawBody)
    event = this.stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret)
    const session = event.data.object as any;

    switch (event.type) {

      case 'checkout.session.completed':
        if (session.status === 'complete') {
          if (session.payment_status === "paid") {
            await this.orderService.updatePaymentStatus(session?.id, PAYMENT_STATUS.PAID, session.payment_intent);
            await this.stripeLogService.createStripeLog(session?.id, PAYMENT_STATUS.PAID);
            await this.paymentLogService.createPaymentLog(session?.id, PAYMENT_STATUS.PAID);
          }

        } else {
          await this.orderService.updatePaymentStatus(session.id, PAYMENT_STATUS.FAILED);
          await this.stripeLogService.createStripeLog(session.id, PAYMENT_STATUS.FAILED);
          await this.paymentLogService.createPaymentLog(session?.id, PAYMENT_STATUS.FAILED);
        }
        break;

      case 'checkout.session.expired':
        await this.orderService.updatePaymentStatus(session.id, PAYMENT_STATUS.EXPIRED);
        await this.stripeLogService.createStripeLog(session.id, PAYMENT_STATUS.EXPIRED);
        await this.paymentLogService.createPaymentLog(session?.id, PAYMENT_STATUS.EXPIRED);
        break;

      case 'checkout.session.async_payment_failed':
        await this.orderService.updatePaymentStatus(session.id, PAYMENT_STATUS.FAILED);
        await this.stripeLogService.createStripeLog(session.id, PAYMENT_STATUS.FAILED);
        await this.paymentLogService.createPaymentLog(session?.id, PAYMENT_STATUS.FAILED);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }
}
