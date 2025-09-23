import { BaseEntity } from "src/common/base/base.entity";
import { Entity, ManyToMany } from "typeorm";
import { Track } from "../../track/entities/track.entity";

@Entity('popular-tracks')
export class PopularTrack extends BaseEntity {
  @ManyToMany(() => Track, track => track.popular_tracks, { eager: true })
  tracks: Track[]
}
