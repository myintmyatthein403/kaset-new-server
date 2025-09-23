import { BaseEntity } from "src/common/base/base.entity";
import { Entity, ManyToMany } from "typeorm";
import { Track } from "../../track/entities/track.entity";
import { User } from "src/modules/user-services/user/entities/user.entity";

@Entity('featured-artists')
export class FeaturedArtist extends BaseEntity {
  @ManyToMany(() => User, user => user.featured_artists, { eager: true })
  artists: User[]
}
