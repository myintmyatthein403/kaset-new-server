import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/base/base.entity";
import { Media } from "src/modules/media-services/media/entities/media.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Track } from "../../track/entities/track.entity";
import { User } from "src/modules/user-services/user/entities/user.entity";

@Entity('albums')
export class Album extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @OneToOne(() => Media, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'cover_id' }) // Specify the foreign key column name
  cover?: Media;

  @OneToMany(() => Track, track => track.album, { eager: true })
  tracks: Track[];

  // Many-to-many relationship with User. Album is the owner of the join table.
  @ManyToMany(() => User, user => user.albums, { eager: true })
  @JoinTable({
    name: 'album_artists', // Name of the join table
    joinColumn: {
      name: 'album_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_id',
      referencedColumnName: 'id',
    },
  })
  artists: User[];
}
