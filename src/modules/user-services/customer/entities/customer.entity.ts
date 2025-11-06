import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { ACCOUNT_STATUS } from "src/common/enums/enums";
import { StripeLog } from "src/modules/payment-services/stripe-log/entities/stripe-log.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  user_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  access_token: string;

  @Column({
    type: 'enum',
    enum: ACCOUNT_STATUS,
    default: ACCOUNT_STATUS.ACTIVE,
  })
  @IsEnum(ACCOUNT_STATUS)
  status: ACCOUNT_STATUS;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  banned_reason?: string;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  banned_until?: Date;

}
