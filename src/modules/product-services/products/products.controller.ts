import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BaseController } from 'src/common/base/base.controller';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController extends BaseController<Product> {
  constructor(private readonly productsService: ProductsService) { super(productsService) }

}
