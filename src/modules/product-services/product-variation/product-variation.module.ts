import { Module } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { ProductVariationController } from './product-variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariation } from './entities/product-variation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductVariation
    ])
  ],
  controllers: [ProductVariationController],
  providers: [ProductVariationService],
})
export class ProductVariationModule { }
