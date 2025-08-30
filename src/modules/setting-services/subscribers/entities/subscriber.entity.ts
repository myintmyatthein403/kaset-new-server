import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('subscribers')
export class Subscriber extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
