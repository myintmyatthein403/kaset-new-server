import { Controller } from '@nestjs/common';
import { TrackService } from './track.service';
import { BaseController } from 'src/common/base/base.controller';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController extends BaseController<Track> {
  constructor(private readonly trackService: TrackService) { super(trackService) }

}
