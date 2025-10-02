
import { Controller, Post, Headers, Req, HttpCode } from '@nestjs/common';
import * as rawbody from 'raw-body'; // raw-body ကို install လုပ်ထားဖို့ လိုအပ်ပါတယ်
import { PAYMENT_STATUS } from 'src/common/enums/enums';
import { OrdersService } from 'src/modules/order-services/orders/orders.service';
import Stripe from 'stripe';

@Controller('stripe-webhook') // **သီးခြား Route Path**
export class StripeWebhookController {
  private readonly stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(
    private readonly orderService: OrdersService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  }

  @Post()
  @HttpCode(200)
  async handleWebhook(@Headers('stripe-signature') signature: string, @Req() req: any) {
    let event: Stripe.Event;
    const rawBody = req.rawBody;
    event = this.stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      this.orderService.updatePaymentStatus(session.id, PAYMENT_STATUS.PAID);
    }
    return { received: true };
  }
}
