import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}
