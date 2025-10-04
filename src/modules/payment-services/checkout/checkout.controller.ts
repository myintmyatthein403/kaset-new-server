import { Controller, Post, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Post('/callback')
  getCallback(
    @Query() data: any
  ) {
    return this.checkoutService.getCallback(data);
  }

}
