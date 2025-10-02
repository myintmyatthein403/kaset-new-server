import { BaseEntity } from "src/common/base/base.entity";
import { Product } from "../../products/entities/product.entity";
import { Entity, ManyToMany } from "typeorm";

@Entity('featured_products')
export class FeaturedProduct extends BaseEntity {
  @ManyToMany(() => Product, product => product.featured_products, { eager: true })
  products: Product[]
}
