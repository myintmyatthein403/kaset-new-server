import { IsBoolean, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { CartItem } from "../../cart-items/entities/cart-item.entity";
import { OrderItem } from "src/modules/order-services/order-items/entities/order-item.entity";
import { Order } from "src/modules/order-services/orders/entities/order.entity";

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  about: string;

  @Column({ type: 'float' })
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_product_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_price_id?: string;

  @Column({ type: 'text', nullable: true })
  @IsJSON()
  @IsOptional()
  included_item?: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'product_image_id' })
  product_image: Media;

  @ManyToOne(() => ProductCategory, { eager: true })
  product_category: ProductCategory;

  @ManyToOne(() => CartItem, { eager: true })
  cart_item: CartItem

  @ManyToOne(() => OrderItem, { eager: true })
  order_item: OrderItem
}
