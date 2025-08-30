import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { BaseController } from 'src/common/base/base.controller';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController extends BaseController<Cart> {
  constructor(private readonly cartService: CartService) { super(cartService) }
}
