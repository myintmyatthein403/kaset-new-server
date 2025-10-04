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

      // Step 2: Handle product variations (Soft Delete for removal).
      if (variations) {
        // ID ပါသော Variations များကို ထိန်းသိမ်းရမည့် စာရင်းအဖြစ် သတ်မှတ်
        const variationIdsToKeep = variations.filter(v => v.id).map(v => v.id);

        // ✅ 1. ဖျက်ပစ်လိုသော Variations များကို Soft Delete ပြုလုပ်ခြင်း (Order-items ကို မထိခိုက်စေရန်)
        // (စာရင်းအသစ်ထဲမှာ မပါဝင်တော့သော၊ လက်ရှိ deleted_at မရှိသေးသော အဟောင်းများကို ရွေးချယ်)
        await transactionalEntityManager.update(
          ProductVariation,
          {
            product: { id: id },
            id: Not(In(variationIdsToKeep)),
            deletedAt: IsNull() // ပြီးသားကို ထပ်မဖျက်စေရန်
          },
          // deleted_at field တွင် လက်ရှိအချိန်တန်ဖိုး ထည့်သွင်းခြင်း
          { deletedAt: new Date() }
        );

        // ✅ 2. အသစ်ထပ်ထည့်ရန် သို့မဟုတ် ရှိပြီးသားကို Update လုပ်ရန်
        const updatedVariations = variations.map(v => ({
          ...v,
          product: { id: id },
          // ပြန်လည်အသုံးပြုထားသော (undeleted) Variation များအတွက် deleted_at ကို null ပြန်ထားရန်
          deleted_at: null
        }));

        // save() သည် ID ပါလျှင် Update လုပ်ပြီး၊ ID မပါလျှင် Insert လုပ်သည်။
        await transactionalEntityManager.save(ProductVariation, updatedVariations as DeepPartial<ProductVariation>[]);
      }

      // Step 3: Handle product images (Images အတွက် Hard Delete ကို ဆက်လက် အသုံးပြုနိုင်သည်)
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
