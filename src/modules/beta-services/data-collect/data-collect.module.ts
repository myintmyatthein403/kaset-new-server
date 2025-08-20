import { Module } from '@nestjs/common';
import { DataCollectService } from './data-collect.service';
import { DataCollectController } from './data-collect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCollect } from './entities/data-collect.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [DataCollect]
    )
  ],
  controllers: [DataCollectController],
  providers: [DataCollectService],
})
export class DataCollectModule { }
