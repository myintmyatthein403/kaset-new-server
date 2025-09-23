import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { In, Repository } from 'typeorm';
import { BaseService } from 'src/common/base/base.service';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { Genre } from '../genres/entities/genre.entity';

@Injectable()
export class TrackService extends BaseService<Track> {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {
    super(trackRepository)
  }

  async fndWithSlug(slug: string, relations: string[] = []): Promise<Track | null> {
    const entity = await this.trackRepository.findOne({
      where: {
        slug: slug as any,
      },
      relations: []
    })
    return entity;
  }

  async updateTrack(id: string, updateTrackDto: any): Promise<Track> {
    // 1. Find the existing Track, including its relationships
    const trackToUpdate = await this.trackRepository.findOne({
      where: { id },
      relations: ['artists', 'genres', 'music_links'],
    });

    if (!trackToUpdate) {
      throw new NotFoundException(`Track with ID ${id} not found.`);
    }

    // 2. Load the related entities from the database
    const artistIds = updateTrackDto.artists.map(a => a.id);
    const artists = await this.userRepository.find({
      where: {
        id: In(artistIds)
      }
    })
    const genreIds = updateTrackDto.genres.map(g => g.id);
    const genres = await this.genreRepository.find({
      where: {
        id: In(genreIds)
      }
    })

    // NOTE: For music_links, your previous logic was to update or create them.
    // We'll assume the front-end sends the full `music_links` array, which we can then
    // use to set the relationship. The `musicLinkRepository.save` call would handle the
    // update/create logic as you intended previously.

    // 3. Merge the new data onto the existing entity
    // This will update simple columns like name, description, etc.
    this.trackRepository.merge(trackToUpdate, updateTrackDto);

    // 4. Assign the loaded related entities
    // This is the crucial step for many-to-many relationships.
    trackToUpdate.artists = artists;
    trackToUpdate.genres = genres;

    // Assign the links from the DTO. Assuming these links have been updated/created.
    trackToUpdate.music_links = updateTrackDto.music_links;


    // 5. Use the `save` method to persist all changes, including the relationships
    return await this.trackRepository.save(trackToUpdate);
  }
}
