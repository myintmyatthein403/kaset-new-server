import { Module } from '@nestjs/common';
import { MusicCollectionsService } from './music-collections.service';
import { MusicCollectionsController } from './music-collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicCollection } from './entities/music-collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [MusicCollection]
    )
  ],
  controllers: [MusicCollectionsController],
  providers: [MusicCollectionsService],
})
export class MusicCollectionsModule { }
