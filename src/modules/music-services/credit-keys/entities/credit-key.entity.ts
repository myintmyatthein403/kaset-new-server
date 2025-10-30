import { IsNotEmpty } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CreditValue } from "../../credit-values/entities/credit-value.entity";

@Entity('credit-keys')
export class CreditKey extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  name: string;

  @OneToMany(() => CreditValue, cv => cv.credit_key)
  credit_values: CreditValue[];
}

