import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('logo')
export class Logo extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'logo_image_id' })
  logo_image: Media;
}
