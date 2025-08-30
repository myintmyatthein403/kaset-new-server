import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('home-slide-show')
export class HomeSlideShow extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  sub_title?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  button_text?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  url?: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'home_page_image_id' })
  image: Media;
}
