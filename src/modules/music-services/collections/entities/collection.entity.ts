import { IsNotEmpty, IsString } from "class-validator";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Track } from "../../track/entities/track.entity";
import { BaseEntity } from "src/common/base/base.entity";

@Entity('collections')
export class Collection extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'background_image_id' })
  background: Media;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
