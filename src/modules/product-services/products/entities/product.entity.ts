import { IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { CartItem } from "../../cart-items/entities/cart-item.entity";
import { OrderItem } from "src/modules/order-services/order-items/entities/order-item.entity";
import { ProductVariation } from "../../product-variation/entities/product-variation.entity";
import { FeaturedProduct } from "../../featured-products/entities/featured-product.entity";

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  about: string;

  @Column({ type: 'decimal' })
  @IsNumber()
  @IsNotEmpty()
  base_price: number;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  is_out_of_stock: boolean;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  is_active: boolean;


  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  included_item?: string;

  @OneToMany(() => Media, media => media.product, { eager: true })
  product_images: Media[];

  @ManyToOne(() => ProductCategory, { eager: true })
  product_category: ProductCategory;

  @ManyToOne(() => CartItem, { eager: true })
  cart_item: CartItem

  @OneToMany(() => OrderItem, (oi) => oi.product)
  order_items: OrderItem[]

  @OneToMany(() => ProductVariation, (variation) => variation.product, { eager: true })
  variations: ProductVariation[];

  @ManyToMany(() => FeaturedProduct, fp => fp.products)
  @JoinTable()
  featured_products: FeaturedProduct[];
}
