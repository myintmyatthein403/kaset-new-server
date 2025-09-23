import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('product-variations')
export class ProductVariation extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  is_stock?: boolean;



  @Column({
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;


}
