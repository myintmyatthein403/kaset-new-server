import { Controller } from '@nestjs/common';
import { LogoService } from './logo.service';
import { BaseController } from 'src/common/base/base.controller';
import { Logo } from './entities/logo.entity';

@Controller('logo')
export class LogoController extends BaseController<Logo> {
  constructor(private readonly logoService: LogoService) { super(logoService) }
}
