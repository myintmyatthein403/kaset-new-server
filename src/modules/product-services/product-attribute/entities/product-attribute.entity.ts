import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('product-attributes')
export class ProductAttribute extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
