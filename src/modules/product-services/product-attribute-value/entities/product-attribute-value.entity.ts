import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductAttribute } from "../../product-attribute/entities/product-attribute.entity";

@Entity('product-attribute-values')
export class ProductAttributeValue extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  attribute: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ManyToOne(() => ProductAttribute, { eager: true })
  @JoinColumn({ name: 'product_attribute_id' })
  product_attribute: ProductAttribute;
}
