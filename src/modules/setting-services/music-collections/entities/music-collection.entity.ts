import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Track } from "src/modules/music-services/track/entities/track.entity";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('music-collections')
export class MusicCollection extends BaseEntity {
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'background_image_id' })
  background_image: Media;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  @IsString()
  slug: string;

  @OneToMany(() => Track, (track) => track.music_collection, { eager: true })
  tracks: Track[]

}
