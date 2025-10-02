import { Module } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { ProductVariationController } from './product-variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariation } from './entities/product-variation.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductVariation, ApiToken
    ])
  ],
  controllers: [ProductVariationController],
  providers: [ProductVariationService, ApiKeyGuard],
})
export class ProductVariationModule { }
