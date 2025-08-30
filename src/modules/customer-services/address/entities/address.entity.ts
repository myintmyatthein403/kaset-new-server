import { IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Entity, Column } from "typeorm";

@Entity('address')
export class Address extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  house_number?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  road?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @IsString()
  @IsOptional()
  district?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  sub_district?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  province?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @IsString()
  postal_code?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string
}
