import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('user-profiles')
export class UserProfile extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: "text" })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @Column({ type: 'varchar', length: 255 })
  @IsOptional()
  @IsString()
  location?: string;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'profile_image_id' })
  profile_image: Media;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'cover_image_id' })
  cover_image: Media;

  @OneToMany(() => Media, (media) => media.user_profile, { eager: true, nullable: true })
  featured_videos: Media[];
}
