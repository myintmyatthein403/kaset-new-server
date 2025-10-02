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



  async createProductWithVariants(
    productData: {
      name: string;
      description: string;
      variations: {
        sku: string;
        size: string;
        color_name: string;
        color_code: string;
        price: number;
      }[];
    }
  ): Promise<Stripe.Product[]> {
    const createdStripeProducts: Stripe.Product[] = [];

    try {
      for (const variant of productData.variations) {
        // Create a unique name for each variant
        // e.g., "My T-shirt - Size M, Color Red"
        const variantName = `${productData.name} - Size ${variant.size}, Color ${variant.color_name}`;

        // Create the Stripe Product for this specific variant
        const product = await this.stripe.products.create({
          name: variantName,
          description: productData.description,
          // Optional: Add metadata to store your internal variant ID
          metadata: {
            sku: variant.sku,
          },
        });

        // Create the Stripe Price for this product variant
        await this.stripe.prices.create({
          product: product.id,
          unit_amount: variant.price * 100, // Amount in cents
          currency: 'thb',
          active: true,
        });

        createdStripeProducts.push(product);
      }

      return createdStripeProducts;
    } catch (error) {
      // this.logger.error('Failed to create products with variants', error.stack);
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

  async createCheckoutSession(cartItems) {
    const lineItems = cartItems.map((item: any) => {
      return {
        price_data: {
          currency: 'thb',
          unit_amount: Math.round(Number(item.variation.price) * 100),
          product_data: {
            name: `${item.variation.sku}-${item.variation.size}-${item.variation.color_name}`
          }
        },
        quantity: item.quantity
      }
    })

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
      });

      return session;
    } catch (error) {
      // this.logger.error('Failed to create checkout session', error.stack);
      throw error;
    }
  }

  async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: currency,
      });
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }

  async capturePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.capture(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }

  async refundPaymentIntent(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? amount * 100 : undefined, // Amount in cents, optional
      });
      return refund;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId: string): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.retrieve(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async listProducts(): Promise<Stripe.Product[]> {
    try {
      const products = await this.stripe.products.list();
      return products.data;
    } catch (error) {
      throw error;
    }
  }

  async listPrices(productId: string): Promise<Stripe.Price[]> {
    try {
      const prices = await this.stripe.prices.list({ product: productId });
      return prices.data;
    } catch (error) {
      throw error;
    }
  }
}
