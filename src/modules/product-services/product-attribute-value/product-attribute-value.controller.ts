import { Controller } from '@nestjs/common';
import { ProductAttributeValueService } from './product-attribute-value.service';
import { BaseController } from 'src/common/base/base.controller';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

@Controller('product-attribute-value')
export class ProductAttributeValueController extends BaseController<ProductAttributeValue> {
  constructor(private readonly productAttributeValueService: ProductAttributeValueService) { super(productAttributeValueService) }
}
