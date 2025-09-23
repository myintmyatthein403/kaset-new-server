import { Controller } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { BaseController } from 'src/common/base/base.controller';
import { ProductVariation } from './entities/product-variation.entity';

@Controller('product-variation')
export class ProductVariationController extends BaseController<ProductVariation> {
  constructor(private readonly productVariationService: ProductVariationService) { super(productVariationService) }
}
