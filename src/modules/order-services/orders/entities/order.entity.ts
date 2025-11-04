import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ORDER_STAUTS, PAYMENT_METHOD, PAYMENT_STATUS } from "src/common/enums/enums";
import { Address } from "src/modules/customer-services/address/entities/address.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OrderItem } from "../../order-items/entities/order-item.entity";
import { BaseEntity } from "src/common/base/base.entity";
import { Customer } from "src/modules/user-services/customer/entities/customer.entity";
import { StripeLog } from "src/modules/payment-services/stripe-log/entities/stripe-log.entity";

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ type: 'float' })
  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  order_id: string;

  @Column({ type: 'enum', enum: ORDER_STAUTS, default: ORDER_STAUTS.PENDING })
  @IsEnum(ORDER_STAUTS)
  order_status: ORDER_STAUTS;

  @Column({ type: 'enum', enum: PAYMENT_STATUS, default: PAYMENT_STATUS.PENDING })
  @IsEnum(PAYMENT_STATUS)
  payment_status: PAYMENT_STATUS;

  @Column({ type: 'enum', enum: PAYMENT_METHOD, default: PAYMENT_METHOD.CARD })
  @IsEnum(PAYMENT_METHOD)
  payment_method: PAYMENT_METHOD;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_session_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  stripe_transaction_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  dinger_transaction_id?: string;

  @ManyToOne(() => Customer, { eager: true })
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true })
  order_items: OrderItem[]

  @ManyToOne(() => Address, { eager: true })
  shipping_address: Address

}
