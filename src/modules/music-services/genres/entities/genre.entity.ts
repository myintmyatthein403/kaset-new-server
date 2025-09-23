import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Track } from "../../track/entities/track.entity";

@Entity('genres')
export class Genre extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ManyToMany(() => Track, track => track.genres)
  @JoinTable()
  tracks: Track[];
}
