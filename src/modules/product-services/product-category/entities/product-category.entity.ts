import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity('product-categories')
export class ProductCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
