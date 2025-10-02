import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post()
  create(@Body() createStripeDto: any) {
    return this.stripeService.createProductWithVariants(createStripeDto);
  }

  @Patch(':id/price')
  async updateProductPrice(
    @Param('id') productId: string,
    @Body('price') newPrice: number,
  ) {
    try {
      const updatedPrice = await this.stripeService.updatePrice(productId, newPrice);
      return { message: 'Product price updated successfully', price: updatedPrice };
    } catch (error) {
      // Handle the error appropriately, e.g., return a 400 or 500 status
      return { message: 'Failed to update product price', error: error.message };
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() data: Stripe.ProductUpdateParams,
  ) {
    try {
      const updatedProduct = await this.stripeService.updateProduct(productId, data);
      return { message: 'Product updated successfully', product: updatedProduct };
    } catch (error) {
      // Handle the error (e.g., product not found, invalid data)
      return { message: 'Failed to update product', error: error.message };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    try {
      await this.stripeService.deleteProduct(productId);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      return { message: 'Failed to delete product', error: error.message };
    }
  }
}
