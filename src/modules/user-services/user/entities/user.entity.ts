import { Exclude } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { DataCollect } from 'src/modules/beta-services/data-collect/entities/data-collect.entity';
import { Track } from 'src/modules/music-services/track/entities/track.entity';
import { Album } from 'src/modules/music-services/album/entities/album.entity';
import { FeaturedArtist } from 'src/modules/music-services/featured-artists/entities/featured-artist.entity';

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

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  last_login_at?: Date;

  @Column({ type: 'boolean', default: false })
  @IsOptional()
  @IsBoolean()
  claimable?: boolean;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' }) // Explicitly name the foreign key column
  role: Role;

  @OneToOne(() => UserProfile, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_profile_id' })
  user_profile: UserProfile;

  @OneToMany(() => DataCollect, (dc) => dc.created_by)
  data_collect: DataCollect[];

  @ManyToMany(() => Track, (track) => track.artists, {
    nullable: true,
  })
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album, (album) => album.artists)
  albums: Album[];

  @ManyToMany(() => FeaturedArtist, pt => pt.artists)
  @JoinTable()
  featured_artists: FeaturedArtist[];
}
