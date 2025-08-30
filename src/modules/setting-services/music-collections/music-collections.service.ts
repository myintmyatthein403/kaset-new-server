import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicCollection } from './entities/music-collection.entity';
import { BaseService } from 'src/common/base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class MusicCollectionsService extends BaseService<MusicCollection> {
  constructor(
    @InjectRepository(MusicCollection)
    private readonly musicCollectionRepository: Repository<MusicCollection>,
  ) {
    super(musicCollectionRepository)
  }
}
