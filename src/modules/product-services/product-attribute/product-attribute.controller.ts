import { Controller } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { BaseController } from 'src/common/base/base.controller';
import { ProductAttribute } from './entities/product-attribute.entity';

@Controller('product-attribute')
export class ProductAttributeController extends BaseController<ProductAttribute> {
  constructor(private readonly productAttributeService: ProductAttributeService) {
    super(productAttributeService)
  }
}
