import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { PAYMENT_STATUS } from "src/common/enums/enums";
import { Order } from "src/modules/order-services/orders/entities/order.entity";
import { Customer } from "src/modules/user-services/customer/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('dinger-logs')
export class DingerLog extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  transactionNum: string;

  @Column({ type: 'enum', enum: PAYMENT_STATUS })
  @IsEnum(PAYMENT_STATUS)
  @IsNotEmpty()
  status: PAYMENT_STATUS;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  method: string;

  @Column({ type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @Column({ type: 'decimal' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ManyToOne(() => Customer, {
    onDelete: 'SET NULL',
    nullable: true
  })
  customer: Customer

  @Column({ type: 'uuid', nullable: true })
  customerId: string;

  @OneToOne(() => Order, {
    onDelete: 'CASCADE', // Order ကို ဖျက်လျှင် Log ကိုပါ ဖျက်မည်
    nullable: true, // Log က Order မပါဘဲလည်း ရှိနိုင်သည် (ဥပမာ- စမ်းသပ်မှုများ)
  })
  @JoinColumn({ name: 'order_id' }) // order_id column ကို Foreign Key အဖြစ် သတ်မှတ်
  order: Order;

  // Foreign Key Column (Order ID ကို တိုက်ရိုက် ထည့်သွင်းရန်)
  @Column({ type: 'uuid', nullable: true })
  orderId: string;
}
