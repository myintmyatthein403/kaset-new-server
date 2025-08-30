import { IsJSON, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('faqs')
export class Faq extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  question: string;

  /* @Column({ type: 'jsonb' })
  @IsJSON()
  @IsNotEmpty()
  answer: JSON */

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
