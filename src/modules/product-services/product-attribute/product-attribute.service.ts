import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ProductAttribute } from './entities/product-attribute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeService extends BaseService<ProductAttribute> {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
  ) {
    super(productAttributeRepository)
  }

}
