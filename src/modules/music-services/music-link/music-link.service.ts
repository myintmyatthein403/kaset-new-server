import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { MusicLink } from './entities/music-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MusicLinkService extends BaseService<MusicLink> {
  constructor(
    @InjectRepository(MusicLink)
    private readonly musicLinkRepository: Repository<MusicLink>,
  ) {
    super(musicLinkRepository)
  }
}
