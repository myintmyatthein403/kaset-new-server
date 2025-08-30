import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Logo } from './entities/logo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LogoService extends BaseService<Logo> {
  constructor(
    @InjectRepository(Logo)
    private readonly logoRepository: Repository<Logo>,
  ) {
    super(logoRepository)
  }
}
