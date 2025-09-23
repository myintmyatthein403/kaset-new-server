import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import stripeConfig from 'src/common/config/stripe.config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private secretKey: string;

  constructor(private configService: ConfigService) {
    // Get the secret key from the config service
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    // Throw a clear error if the key is not found
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY not found. Please check your .env file.');
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createProduct(
    data: any
  ): Promise<Stripe.Product> {
    try {
      const { name, description, price } = data;
      const product = await this.stripe.products.create({ name, description });
      await this.stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, // amount in cents
        currency: 'thb',
        active: true,
      });
      // this.logger.log(`Product created successfully: ${name}`);
      return product;
    } catch (error) {
      // this.logger.error('Failed to create product', error.stack);
      throw error;
    }
  }

  async updatePrice(
    productId: string,
    newPriceInBaht: number,
  ): Promise<Stripe.Price> {
    try {
      // 1. Find the current active prices for the product
      const prices = await this.stripe.prices.list({
        product: productId,
        active: true,
      });

      // 2. Deactivate each of the current prices
      for (const price of prices.data) {
        await this.stripe.prices.update(price.id, { active: false });
      }

      // 3. Create a new price with the new amount
      const newStripePrice = await this.stripe.prices.create({
        product: productId,
        unit_amount: newPriceInBaht * 100,
        currency: 'thb',
        active: true,
      });

      return newStripePrice;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId: string, data: Stripe.ProductUpdateParams): Promise<Stripe.Product> {
    try {
      const updatedProduct = await this.stripe.products.update(productId, data);
      return updatedProduct;
    } catch (error) {
      // You can add logging here to catch any errors
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.stripe.products.del(productId);
      // this.logger.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      // You should check for the specific Stripe error code here
      if (error.code === 'resource_cannot_be_deleted') {
        throw new Error(
          `Product with ID ${productId} cannot be deleted because it has associated prices. Please archive it instead.`,
        );
      }
      throw error;
    }
  }
}
