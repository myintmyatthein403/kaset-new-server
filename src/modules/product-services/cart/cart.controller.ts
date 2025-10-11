import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { BaseController } from 'src/common/base/base.controller';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('cart')
export class CartController extends BaseController<Cart> {
  constructor(private readonly cartService: CartService) { super(cartService) }

  @UseGuards(JwtAuthGuard)
  @Post('/check-stock')
  async checkCartItemsAreInStock(
    @Body() data: any
  ) {
    return this.cartService.checkCartItemsAreInStock(data)
  }

}
