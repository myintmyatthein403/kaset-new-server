import { Inject, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, In, Not } from 'typeorm';
import { BaseService } from 'src/common/base/base.service';
import { ProductVariation } from '../product-variation/entities/product-variation.entity';
import { Media } from 'src/modules/media-services/media/entities/media.entity';
import { StripeService } from 'src/modules/payment-services/stripe/stripe.service';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly stripeService: StripeService,
  ) {
    super(productRepository)
  }

  async createNewProduct(data: any) {
    const { variations, product_images, ...productData } = data;
    const stripeData = await this.stripeService.createProductWithVariants(data);
    const newProdut = await this.productRepository.manager.transaction(async transactionalEntityManager => {
      const product = await transactionalEntityManager.save(Product, productData as DeepPartial<Product>);
      const variationsWithProduct = variations.map(v => ({
        ...v,
        stripe_product_id: stripeData?.length > 0 && stripeData.find((s: any) => s?.metadata?.sku == v?.sku)?.id,
        product: product
      })); const productImagesWithProduct = product_images.map(img => ({ ...img, product: product }));

      await transactionalEntityManager.save(ProductVariation, variationsWithProduct as DeepPartial<ProductVariation>[]);
      await transactionalEntityManager.save(Media, productImagesWithProduct as DeepPartial<Media>[]);

      return await transactionalEntityManager.findOne(Product, {
        where: { id: product.id },
        relations: ['variations', 'product_images']
      });
    });
    return newProdut;
  }

  async updateProduct(id: string, data: any) {
    const { variations, product_images, ...productData } = data;

    // This ensures that all changes are applied as a single atomic operation.
    return await this.productRepository.manager.transaction(async transactionalEntityManager => {

      // Step 1: Update the main product data.
      await transactionalEntityManager.update(Product, id, productData);

      // Step 2: Handle product variations.
      if (variations) {
        // First, delete old variations that are not in the new list.
        const variationIdsToKeep = variations.filter(v => v.id).map(v => v.id);
        await transactionalEntityManager.delete(ProductVariation, {
          product: { id: id },
          id: Not(In(variationIdsToKeep))
        });

        // Now, save the updated list. TypeORM will update existing and create new ones.
        const updatedVariations = variations.map(v => ({ ...v, product: { id: id } }))
        await transactionalEntityManager.save(ProductVariation, updatedVariations as DeepPartial<ProductVariation>[]);
      }

      // Step 3: Handle product images.
      if (product_images) {
        // First, delete old images that are not in the new list.
        const imageIdsToKeep = product_images.filter(i => i.id).map(i => i.id);
        await transactionalEntityManager.delete(Media, {
          product: { id: id },
          id: Not(In(imageIdsToKeep))
        });

        // Save the updated list. TypeORM will update existing and create new ones.
        const updatedImages = product_images.map(i => ({ ...i, product: { id: id } }));
        await transactionalEntityManager.save(Media, updatedImages as DeepPartial<Media>[]);
      }

      // Step 4: Return the updated product.
      return await transactionalEntityManager.findOne(Product, {
        where: { id },
        relations: ['variations', 'product_images']
      });
    });
  }

  async fndWithSlug(slug: string, relations: string[] = []): Promise<Product | null> {
    const entity = await this.productRepository.findOne({
      where: {
        slug: slug as any,
      },
      relations: []
    })
    return entity;
  }


}
