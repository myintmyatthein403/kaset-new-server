import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ProductVariation } from './entities/product-variation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductVariationService extends BaseService<ProductVariation> {
  constructor(
    @InjectRepository(ProductVariation)
    private readonly productVariationRepository: Repository<ProductVariation>,
  ) {
    super(productVariationRepository)
  }
}
