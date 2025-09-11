import { Controller } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { BaseController } from 'src/common/base/base.controller';
import { Platform } from './entities/platform.entity';

@Controller('platforms')
export class PlatformsController extends BaseController<Platform> {
  constructor(private readonly platformsService: PlatformsService) { super(platformsService) }

}
