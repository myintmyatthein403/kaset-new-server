import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ProductVariation } from '../product-variation/entities/product-variation.entity';
import { Media } from 'src/modules/media-services/media/entities/media.entity';
import { StripeModule } from 'src/modules/payment-services/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Product, ApiToken]
    ),
    StripeModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ApiKeyGuard],
})
export class ProductsModule { }
