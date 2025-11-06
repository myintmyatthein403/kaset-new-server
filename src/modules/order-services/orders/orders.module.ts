import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StripeModule } from 'src/modules/payment-services/stripe/stripe.module';
import { DingerModule } from 'src/modules/payment-services/dinger/dinger.module';
import { StripeLog } from 'src/modules/payment-services/stripe-log/entities/stripe-log.entity';
import { DingerLogModule } from 'src/modules/payment-services/dinger-log/dinger-log.module';
import { DingerLog } from 'src/modules/payment-services/dinger-log/entities/dinger-log.entity';
import { PaymentLog } from 'src/modules/payment-services/payment-log/entities/payment-log.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ProductVariation } from 'src/modules/product-services/product-variation/entities/product-variation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Order, StripeLog, DingerLog, PaymentLog, ApiToken, ProductVariation]
    ),
    StripeModule,
    DingerModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ApiKeyGuard],
  exports: [OrdersService]
})
export class OrdersModule { }
