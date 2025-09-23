import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('exchange-rates')
export class ExchangeRate extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Currency code (e.g., USD, EUR)',
  })
  currency: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: false,
    comment: 'Exchange rate against a base currency',
  })
  rate: number;
}
