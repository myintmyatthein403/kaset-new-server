import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class AlbumService extends BaseService<Album> {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

  ) {
    super(albumRepository)
  }
  // Assuming this is in an Album service
  async updateAlbum(id: string, updateAlbumDto: any): Promise<Album> {
    // 1. Find the existing Album entity, loading its relationships
    const albumToUpdate = await this.albumRepository.findOne({
      where: { id },
      relations: ['tracks', 'artists'], // Add any other relations you need
    });

    if (!albumToUpdate) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }

    // 2. Load the new related entities from the database
    const trackIds = updateAlbumDto.tracks?.map(t => t.id);
    const newTracks = await this.trackRepository.find({
      where: {
        id: In(trackIds),
      },
    });

    const artistIds = updateAlbumDto.artists?.map(a => a.id);
    const artists = await this.userRepository.find({
      where: {
        id: In(artistIds),
      },
    });

    // 3. Merge the simple properties from the DTO
    this.albumRepository.merge(albumToUpdate, updateAlbumDto);

    // 4. Assign the new related entities to the album
    // This is the key step for handling relationships.
    albumToUpdate.tracks = newTracks;
    albumToUpdate.artists = artists;

    // 5. Use the `save` method to persist the changes.
    // TypeORM will automatically update the foreign keys on the Track entities
    // and manage the join table for the artists.
    return await this.albumRepository.save(albumToUpdate);
  }

  async fndWithSlug(slug: string, relations: string[] = []): Promise<Album | null> {
    const entity = await this.albumRepository.findOne({
      where: {
        slug: slug as any,
      },
      relations: []
    })
    return entity;
  }
}
