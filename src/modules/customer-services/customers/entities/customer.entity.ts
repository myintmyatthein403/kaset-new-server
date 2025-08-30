import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Order } from "src/modules/order-services/orders/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  provider?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsString()
  @IsOptional()
  provider_id?: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
