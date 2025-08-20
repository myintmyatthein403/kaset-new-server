import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('slide-shows')
export class SlideShow extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  sub_title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  button_text?: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'media_id' })
  media: Media;
}
