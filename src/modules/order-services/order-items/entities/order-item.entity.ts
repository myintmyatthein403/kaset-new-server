import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Product } from "src/modules/product-services/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { ProductVariation } from "src/modules/product-services/product-variation/entities/product-variation.entity";

@Entity('order-items')
export class OrderItem extends BaseEntity {
  @Column({ type: 'integer' })
  @IsNumber()
  @IsNotEmpty()
  quantity: Number;

  @Column({ type: 'float' })
  @IsNumber()
  @IsNotEmpty()
  price_at_order: Number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => ProductVariation, { eager: true })
  variation: ProductVariation

  @ManyToOne(() => Order)
  order: Order;
}
