import { Module } from '@nestjs/common';
import { ProductAttributeValueService } from './product-attribute-value.service';
import { ProductAttributeValueController } from './product-attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAttributeValue
    ])
  ],
  controllers: [ProductAttributeValueController],
  providers: [ProductAttributeValueService],
})
export class ProductAttributeValueModule { }
