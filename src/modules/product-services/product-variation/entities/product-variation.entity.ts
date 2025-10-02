import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { OrderItem } from "src/modules/order-services/order-items/entities/order-item.entity";

@Entity('product-variations')
export class ProductVariation extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  size?: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  @IsString()
  @IsOptional()
  color_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_product_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_price_id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  color_code?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  is_out_of_stock?: boolean;

  @ManyToOne(() => Product, (product) => product.variations)
  product: Product;

  @OneToMany(() => OrderItem, (oi) => oi.variation)
  order_items: OrderItem[]
}
