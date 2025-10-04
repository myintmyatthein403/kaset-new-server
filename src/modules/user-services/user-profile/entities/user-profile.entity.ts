import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { Media } from 'src/modules/media-services/media/entities/media.entity';
import { SocialMediaLink } from 'src/modules/setting-services/social-media-links/entities/social-media-link.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user-profiles')
export class UserProfile extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  slug: string;

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  featured_video: string;

  @OneToMany(
    () => SocialMediaLink,
    (socialMediaLink) => socialMediaLink.artist,
    { eager: true },
  )
  social_media_links: SocialMediaLink[];
}
