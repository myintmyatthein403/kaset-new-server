import { Controller } from '@nestjs/common';
import { MusicCollectionsService } from './music-collections.service';
import { BaseController } from 'src/common/base/base.controller';
import { MusicCollection } from './entities/music-collection.entity';

@Controller('music-collections')
export class MusicCollectionsController extends BaseController<MusicCollection> {
  constructor(private readonly musicCollectionsService: MusicCollectionsService) {
    super(musicCollectionsService)
  }

}
