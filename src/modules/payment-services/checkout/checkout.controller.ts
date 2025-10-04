import { Body, Controller, Post, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Post('/callback')
  dingerCallback(
    @Body() data: any
  ) {
    return this.checkoutService.handleDingerCallback(data);
  }

}
