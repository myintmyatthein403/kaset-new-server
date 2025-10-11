import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductVariation } from '../product-variation/entities/product-variation.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, ProductVariation, ApiToken])
  ],
  controllers: [CartController],
  providers: [CartService, ApiKeyGuard],
})
export class CartModule { }
