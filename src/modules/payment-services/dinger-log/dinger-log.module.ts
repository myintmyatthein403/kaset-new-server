import { Module } from '@nestjs/common';
import { DingerLogService } from './dinger-log.service';
import { DingerLogController } from './dinger-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DingerLog } from './entities/dinger-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DingerLog
    ])
  ],
  controllers: [DingerLogController],
  providers: [DingerLogService],
  exports: [DingerLogService]
})
export class DingerLogModule { }
