import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/modules/order-services/orders/orders.module';
import { StripeWebhookController } from './stripe-webhook.controller'; // Assuming the controller is here

@Module({
  imports: [
    OrdersModule
  ],
  controllers: [StripeWebhookController],
})
export class StripeWebhookModule { }
