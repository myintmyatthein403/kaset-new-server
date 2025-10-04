import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/modules/order-services/orders/orders.module';
import { StripeWebhookController } from './stripe-webhook.controller'; // Assuming the controller is here
import { StripeLogModule } from 'src/modules/payment-services/stripe-log/stripe-log.module';
import { PaymentLogModule } from 'src/modules/payment-services/payment-log/payment-log.module';

@Module({
  imports: [
    OrdersModule,
    StripeLogModule,
    PaymentLogModule,
  ],
  controllers: [StripeWebhookController],
})
export class StripeWebhookModule { }
