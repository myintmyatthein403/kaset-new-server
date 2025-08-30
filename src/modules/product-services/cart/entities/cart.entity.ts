import { BaseEntity } from "src/common/base/base.entity";
import { Customer } from "src/modules/customer-services/customers/entities/customer.entity";
import { Entity, OneToMany, OneToOne } from "typeorm";
import { CartItem } from "../../cart-items/entities/cart-item.entity";

@Entity('carts')
export class Cart extends BaseEntity {
  @OneToOne(() => Customer, { eager: true })
  customer: Customer

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { eager: true })
  cart_item: CartItem[];
}
