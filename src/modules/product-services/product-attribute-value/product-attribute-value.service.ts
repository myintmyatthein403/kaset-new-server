import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeValueService extends BaseService<ProductAttributeValue> {
  constructor(
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepository: Repository<ProductAttributeValue>,
  ) {
    super(productAttributeValueRepository)
  }
}
