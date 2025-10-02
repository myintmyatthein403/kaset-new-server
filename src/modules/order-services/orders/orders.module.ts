import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StripeModule } from 'src/modules/payment-services/stripe/stripe.module';
import { DingerModule } from 'src/modules/payment-services/dinger/dinger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Order]
    ),
    StripeModule,
    DingerModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
