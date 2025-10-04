// src/media/media.entity.ts
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { DataCollect } from 'src/modules/beta-services/data-collect/entities/data-collect.entity';
import { Track } from 'src/modules/music-services/track/entities/track.entity';
import { Product } from 'src/modules/product-services/products/entities/product.entity';
import { UserProfile } from 'src/modules/user-services/user-profile/entities/user-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('media')
export class Media extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  url: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @ManyToOne(() => Track, (track) => track.story_boards, { onDelete: 'CASCADE' })
  track_story_board: Track;

  @ManyToOne(() => Track, (track) => track.bts_images, { onDelete: "CASCADE" })
  track_bts_image: Track;

  @ManyToOne(() => DataCollect, (dc) => dc.track_bts_images, { onDelete: 'CASCADE' })
  track_bts: DataCollect;

  @ManyToOne(() => DataCollect, (dc) => dc.track_story_boards, { onDelete: 'CASCADE' })
  track_story: DataCollect;

  @ManyToOne(() => Product, product => product.product_images)
  product: Product;
}
