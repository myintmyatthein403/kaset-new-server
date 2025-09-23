import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { SocialMediaLink } from "../../social-media-links/entities/social-media-link.entity";

@Entity('platforms')
export class Platform extends BaseEntity {
  @Column({ type: "varchar", length: 50 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'platform_icon_url' })
  icon: Media;

  @OneToMany(() => SocialMediaLink, sml => sml.platform)
  social_media_links: SocialMediaLink[];
}
