import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { OrdersModule } from 'src/modules/order-services/orders/orders.module';
import { DingerLogModule } from '../dinger-log/dinger-log.module';

@Module({
  imports: [
    OrdersModule, DingerLogModule
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule { }
