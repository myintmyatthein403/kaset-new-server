
import { Exclude } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { DataCollect } from 'src/modules/beta-services/data-collect/entities/data-collect.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @Exclude()
  passwordHash: string;

  @Column({ type: 'enum', enum: ACCOUNT_STATUS, default: ACCOUNT_STATUS.ACTIVE })
  @IsEnum(ACCOUNT_STATUS)
  status: ACCOUNT_STATUS;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  banned_reason?: string;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  banned_until?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  last_login_at?: Date;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  @OneToOne(() => UserProfile, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_profile_id' })
  user_profile: UserProfile;

  @OneToMany(() => DataCollect, (dc) => dc.created_by)
  data_collect: DataCollect[];
}

