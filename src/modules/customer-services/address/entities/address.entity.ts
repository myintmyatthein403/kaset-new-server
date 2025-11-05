import { IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Customer } from "src/modules/user-services/customer/entities/customer.entity";
import { Entity, Column, ManyToOne } from "typeorm";

@Entity('address')
export class Address extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  house_number: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  road: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  district: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  sub_district: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  province: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  country: string;

  @Column({ type: 'varchar', length: 10 })
  @IsString()
  postal_code: string;

  @Column({ type: 'varchar', length: 20 })
  @IsPhoneNumber()
  phone_number: string

  @ManyToOne(() => Customer, { onDelete: 'CASCADE', eager: true })
  customer: Customer
}
