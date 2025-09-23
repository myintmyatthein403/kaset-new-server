import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Track } from "../../track/entities/track.entity";
import { Platform } from "src/modules/setting-services/platforms/entities/platform.entity";

@Entity('music-links')
export class MusicLink extends BaseEntity {
  @ManyToOne(() => Track, track => track.music_links)
  @JoinColumn({ name: 'track_id' })
  track: Track;

  @Column()
  url: string;

  @ManyToOne(() => Platform, platform => platform.social_media_links, { eager: true })
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;
}
