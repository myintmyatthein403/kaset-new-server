import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Get('/callback')
  getCallback(
    @Query() data: any
  ) {
    return this.checkoutService.getCallback(data);
  }

}
