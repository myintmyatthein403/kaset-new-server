import { Module } from '@nestjs/common';
import { FeaturedProductsService } from './featured-products.service';
import { FeaturedProductsController } from './featured-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturedProduct } from './entities/featured-product.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeaturedProduct, ApiToken, Product
    ])
  ],
  controllers: [FeaturedProductsController],
  providers: [FeaturedProductsService, ApiKeyGuard],
})
export class FeaturedProductsModule { }
