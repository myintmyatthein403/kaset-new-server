import { BaseEntity } from "src/common/base/base.entity";
import { Entity, OneToMany, OneToOne } from "typeorm";
import { CartItem } from "../../cart-items/entities/cart-item.entity";
import { Customer } from "src/modules/user-services/customer/entities/customer.entity";

@Entity('carts')
export class Cart extends BaseEntity {
  @OneToOne(() => Customer, { eager: true })
  customer: Customer

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { eager: true })
  cart_item: CartItem[];
}
