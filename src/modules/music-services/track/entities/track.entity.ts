import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { MusicCollection } from "src/modules/setting-services/music-collections/entities/music-collection.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('tracks')
export class Track extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  youtube_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  duration?: string;

  @Index()
  @Column({ type: 'varchar', length: 150, nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: "cover_image_id" })
  cover_image?: Media;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: "track_image_id" })
  track_image?: Media;

  @OneToMany(() => Media, (media) => media.track_story_board)
  story_boards?: Media[]

  @OneToMany(() => Media, (media) => media.track_bts_image)
  bts_images?: Media[];

  @ManyToOne(() => MusicCollection, (mc) => mc.tracks)
  music_collection: MusicCollection;
}
