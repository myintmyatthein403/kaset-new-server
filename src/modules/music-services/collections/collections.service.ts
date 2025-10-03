import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Collection } from './entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class CollectionsService extends BaseService<Collection> {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super(collectionRepository)
  }

  async updateCollection(id: string, data: any) {
    const tracks = await Promise.all(data.tracks.map(async (track) => {
      return this.trackRepository.findOne({
        where: {
          id: track.id
        }
      })
    }))
    const collection = await this.collectionRepository.findOne({
      where: {
        id
      }
    })

    if (!collection) {
      return this.collectionRepository.save({
        id,
        tracks
      })
    }

    collection.tracks = tracks
    return this.collectionRepository.save(collection)
  }

  async findWithSlug(slug: string) {
    const entity = await this.collectionRepository.findOne({
      where: {
        slug: slug as any,
      },
      relations: []
    })
    return entity;

  }
}
