import { Controller } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { BaseController } from 'src/common/base/base.controller';
import { CartItem } from './entities/cart-item.entity';

@Controller('cart-items')
export class CartItemsController extends BaseController<CartItem> {
  constructor(private readonly cartItemsService: CartItemsService) { super(cartItemsService) }
}
