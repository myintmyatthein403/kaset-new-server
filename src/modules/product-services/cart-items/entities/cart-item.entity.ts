import { IsNumber, IsOptional } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { Cart } from "../../cart/entities/cart.entity";

@Entity('cart-items')
export class CartItem extends BaseEntity {
  @Column({ type: 'integer' })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @OneToMany(() => Product, (product) => product.cart_item)
  products: Product[]

  @ManyToOne(() => Cart)
  cart: Cart
}

