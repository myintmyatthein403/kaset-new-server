import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductVariation } from '../product-variation/entities/product-variation.entity';

@Injectable()
export class CartService extends BaseService<Cart> {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(ProductVariation)
    private readonly productVariationRepository: Repository<ProductVariation>,
  ) {
    super(cartRepository)
  }

  async checkCartItemsAreInStock(data) {
    if (!data?.cart || data.cart.length === 0) {
      // Cart ထဲမှာ ပစ္စည်းမရှိရင် status: true နဲ့ items အလွတ် ပြန်ပေးနိုင်
      return { status: true, items: [] };
    }

    const ids = data.cart.map((item) => item.id);

    const productVariations = await this.productVariationRepository.find({
      where: {
        id: In(ids)
      }
    });


    // 1. Database ထဲမှာ မရှိတော့တဲ့ ပစ္စည်းတွေ စစ်ထုတ်ခြင်း
    const missingItemsFromDb = data.cart.filter((item) => {
      return !productVariations.find((pv) => pv.id === item.id);
    }).map(item => ({
      id: item.id,
      reason: 'Item not found in stock database'
    }));

    // 2. Stock မလုံလောက်တဲ့ ပစ္စည်းတွေ စစ်ထုတ်ခြင်း
    const outOfStockItems = productVariations
      .map((productVariation) => {
        const dataItem = data.cart.find((item) => item.id === productVariation.id);

        // dataItem ကို မတွေ့ရင် ဒီနေရာမှာလည်း ပြဿနာရှိလို့ စစ်ထုတ်နိုင်ပါတယ်။
        if (!dataItem) return null;

        console.log('outofstock: ', productVariation.stock < dataItem.quantity)
        // ဝယ်မယ့် အရေအတွက်က stock ထက် များနေရင် (stock မလုံလောက်ရင်)
        if (productVariation.stock < dataItem.quantity) {
          return {
            id: productVariation.id,
            requestedQuantity: dataItem.quantity,
            availableStock: productVariation.stock,
            reason: 'Insufficient stock',
          };
        }
        return null;
      })
      .filter(item => item !== null);

    console.log(outOfStockItems)

    // 3. ပြဿနာရှိတဲ့ ပစ္စည်းအားလုံးကို ပေါင်းလိုက်ခြင်း
    const allProblemItems = [...missingItemsFromDb, ...outOfStockItems];

    // 4. လိုချင်တဲ့ format နဲ့ ပြန်ပေးခြင်း
    if (allProblemItems.length > 0) {
      return {
        status: false,
        items: allProblemItems,
      };
    } else {
      // ပစ္စည်းအားလုံး Stock လုံလောက်ရင်
      return {
        status: true,
        items: [],
      };
    }
  }
}
