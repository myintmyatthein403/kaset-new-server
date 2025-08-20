import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../../role/entities/role.entity";

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  api: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  canRead?: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  canCreate?: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  canUpdate?: boolean;

  @Column({ type: 'varchar', default: false })
  @IsBoolean()
  @IsOptional()
  canDelete?: boolean;

  @ManyToOne(() => Role, { eager: true })
  role: Role
}
