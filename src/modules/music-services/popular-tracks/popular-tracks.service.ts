import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PopularTrack } from './entities/popular-track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class PopularTracksService extends BaseService<PopularTrack> {
  constructor(
    @InjectRepository(PopularTrack)
    private readonly popularTrackRepository: Repository<PopularTrack>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super(popularTrackRepository)
  }

  async updatePopularTracks(id: string, data: any) {
    const tracks = await Promise.all(data.tracks.map(async (track) => {
      return this.trackRepository.findOne({
        where: {
          id: track.id
        }
      })
    }))
    const popularTrack = await this.popularTrackRepository.findOne({
      where: {
        id
      }
    })

    if (!popularTrack) {
      return this.popularTrackRepository.save({
        id,
        tracks
      })
    }

    popularTrack.tracks = tracks
    return this.popularTrackRepository.save(popularTrack)
  }
}
