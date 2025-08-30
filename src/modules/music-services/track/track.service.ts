import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class TrackService extends BaseService<Track> {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super(trackRepository)
  }

  async fndWithSlug(slug: string, relations: string[] = []): Promise<Track | null> {
    const entity = await this.trackRepository.findOne({
      where: {
        slug: slug as any,
      },
      relations
    })
    return entity;
  }
}
