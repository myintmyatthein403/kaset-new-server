import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class MediaService extends BaseService<Media> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {
    super(mediaRepository)
  }
}
