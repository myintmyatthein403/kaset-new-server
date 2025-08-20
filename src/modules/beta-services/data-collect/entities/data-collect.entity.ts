import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { User } from "src/modules/user-services/user/entities/user.entity";
import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity('data-collect')
export class DataCollect extends BaseEntity {
  @Column({ type: 'varchar', length: 255, })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsString()
  @IsOptional()
  duration?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsString()
  @IsOptional()
  genre?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  artist?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  spotify_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  apple_music_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  soundcloud_url?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @IsString()
  @IsOptional()
  youtube_url?: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  note?: string;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'track_image_id' })
  track_image?: Media;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'track_cover_image_id' })
  track_cover_image?: Media;

  @OneToMany(() => Media, (media) => media.track_bts, { eager: true, nullable: true })
  track_bts_images: Media[];

  @OneToMany(() => Media, (media) => media.track_story, { eager: true, nullable: true })
  track_story_boards: Media[];

  @ManyToOne(() => User, (user) => user.data_collect,)
  created_by: User;
}
