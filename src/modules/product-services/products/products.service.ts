import { Inject, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, In, Not, IsNull } from 'typeorm';
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

    // Changes are applied as a single atomic operation.
    return await this.productRepository.manager.transaction(async transactionalEntityManager => {

      // Step 1: Update the main product data.
      await transactionalEntityManager.update(Product, id, productData);

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      // Step 2: Handle product variations (Soft Delete for removal).
      if (variations && variations.length > 0) {
        const variationsToSave = variations.map(v => {
        let variationId = v.id;

        // 1. Check if the incoming ID is NOT a valid UUID (i.e., it's a temporary ID)
        if (variationId && !uuidRegex.test(variationId)) {
            // If it's a temporary ID, set it to undefined/null so TypeORM inserts a new record.
            variationId = undefined;
        }
        
        // 2. Return the prepared object
        return {
            ...v,
            // Use the checked ID (UUID for update, undefined for new insert)
            id: variationId, 
            product: {
                id: id
            },
            is_out_of_stock: v.stock <= 0,
            deletedAt: null
        };
    });
        console.log(variationsToSave)

        // const savedVariations = await transactionalEntityManager.save(ProductVariation, variationsToSave);

// 3. Keep လုပ်ရမည့် IDs များကို စုစည်းခြင်း (Identify IDs to Keep) 🆔
        const variationIdsToKeep = variations
          .map(v => v.id)
          .filter(v => v !== undefined)
          .filter(id => id && uuidRegex.test(id));

      


        console.log('variations:', variations)
        console.log('variationIdsToKeep: ', variationIdsToKeep)
        if(variationIdsToKeep.length <= 0) {
          await transactionalEntityManager.save(ProductVariation, variationsToSave);
        } 
        else {
          // If there are variations to keep, update existing ones and add new ones.
          // First, soft-delete variations that are not in the `variationIdsToKeep` list.
          await transactionalEntityManager.update(
            ProductVariation, {
            product: {
              id: id
            },
            id: Not(In(variationIdsToKeep)),
            deletedAt: IsNull()
          }, {
            deletedAt: new Date()
          }
          );

          // Then, save or update the variations that are in the `variationIdsToKeep` list.
          await transactionalEntityManager.save(ProductVariation, variationsToSave);
        }
              } else if (variations && variations.length === 0) {
        // If the client sends an empty array, soft-delete ALL variations for this product
        await transactionalEntityManager.update(
          ProductVariation, {
          product: {
            id: id
          },
          deletedAt: IsNull()
        }, {
          deletedAt: new Date()
        }
        );
      }

      if (product_images) {
        const imageIdsToKeep = product_images.filter(i => i.id).map(i => i.id);
        await transactionalEntityManager.delete(Media, {
          product: { id: id },
          id: Not(In(imageIdsToKeep))
        });

        const updatedImages = product_images.map(i => ({ ...i, product: { id: id } }));
        await transactionalEntityManager.save(Media, updatedImages as DeepPartial<Media>[]);
      }

      // Step 4: Return the updated product.
      // (သင့် Product Repository တွင် Soft Deleted Variations များကို ဖယ်ထုတ်ရန် စီမံထားရမည်)
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

  async removeProducts(id: string) {
    return await this.productRepository.update(id, {
      is_active: false
    })
  }

}
