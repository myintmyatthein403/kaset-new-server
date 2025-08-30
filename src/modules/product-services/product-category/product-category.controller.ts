import { Controller } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { BaseController } from 'src/common/base/base.controller';
import { ProductCategory } from './entities/product-category.entity';

@Controller('product-category')
export class ProductCategoryController extends BaseController<ProductCategory> {
  constructor(private readonly productCategoryService: ProductCategoryService) { super(productCategoryService) }
}
