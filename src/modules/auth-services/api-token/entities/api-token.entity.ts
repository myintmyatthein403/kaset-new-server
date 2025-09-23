import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('api-tokens')
export class ApiToken extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  client_name: string;

  @Column({
    type: 'boolean',
    default: true
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
