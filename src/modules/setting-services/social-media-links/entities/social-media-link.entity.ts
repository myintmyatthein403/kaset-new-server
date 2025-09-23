import { IsNotEmpty, IsString, IsUrl, isURL } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Platform } from "../../platforms/entities/platform.entity";
import { UserProfile } from "src/modules/user-services/user-profile/entities/user-profile.entity";

@Entity('social-media-links')
export class SocialMediaLink extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ManyToOne(() => UserProfile, artist => artist.social_media_links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: UserProfile;

  @ManyToOne(() => Platform, platform => platform.social_media_links, { eager: true })
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;
}
