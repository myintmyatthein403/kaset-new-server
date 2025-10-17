import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { LYRIC_TYPE } from 'src/common/enums/enums';
import { Media } from 'src/modules/media-services/media/entities/media.entity';
import { MusicCollection } from 'src/modules/setting-services/music-collections/entities/music-collection.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MusicLink } from '../../music-link/entities/music-link.entity';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { Album } from '../../album/entities/album.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { PopularTrack } from '../../popular-tracks/entities/popular-track.entity';

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

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  credit?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  duration?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  released_date?: string;

  @Index()
  @Column({ type: 'varchar', length: 150, nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  @Column({
    type: 'enum',
    enum: LYRIC_TYPE,
    default: LYRIC_TYPE.TEXT,
    nullable: true,
  })
  @IsEnum(LYRIC_TYPE)
  lyric_type: LYRIC_TYPE;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  lyric_text?: string;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'lyric_image_id' })
  lyric_image?: Media;

  @Column({
    type: 'enum',
    enum: LYRIC_TYPE,
    default: LYRIC_TYPE.TEXT,
    nullable: true,
  })
  @IsEnum(LYRIC_TYPE)
  chord_type: LYRIC_TYPE;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  chord_text?: string;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'chord_image_id' })
  chord_image?: Media;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'cover_image_id' })
  cover_image?: Media;

  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'track_image_id' })
  track_image?: Media;

  @OneToMany(() => Media, (media) => media.track_story_board, { eager: true })
  story_boards?: Media[];

  @OneToMany(() => Media, (media) => media.track_bts_image, { eager: true })
  bts_images?: Media[];

  @ManyToOne(() => MusicCollection, (mc) => mc.tracks)
  music_collection: MusicCollection;

  @ManyToMany(() => PopularTrack, pt => pt.tracks)
  @JoinTable()
  popular_tracks: PopularTrack[];

  @OneToMany(() => MusicLink, (ml) => ml.track, { eager: true })
  music_links: MusicLink[];

  @ManyToMany(() => User, (user) => user.tracks, { eager: true })
  artists: User[];

  @ManyToMany(() => Genre, genre => genre.tracks, { eager: true })
  genres: Genre[];

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;
}
