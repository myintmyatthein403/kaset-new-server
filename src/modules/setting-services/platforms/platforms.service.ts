import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Platform } from './entities/platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformsService extends BaseService<Platform> {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {
    super(platformRepository)
  }
}
