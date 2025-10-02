import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { FeaturedProduct } from './entities/featured-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class FeaturedProductsService extends BaseService<FeaturedProduct> {
  constructor(
    @InjectRepository(FeaturedProduct)
    private readonly featuredProductRepository: Repository<FeaturedProduct>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(featuredProductRepository)
  }

  async updateFeaturedProduct(id: string, data: any) {
    const products = await Promise.all(data.products.map(async (product) => {
      return this.productRepository.findOne({
        where: {
          id: product.id
        }
      })
    }))
    const featuredProducts = await this.featuredProductRepository.findOne({
      where: {
        id
      }
    })

    if (!featuredProducts) {
      return this.featuredProductRepository.save({
        id,
        products
      })
    }

    featuredProducts.products = products
    return this.featuredProductRepository.save(featuredProducts)
  }

}
