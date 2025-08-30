import { PartialType } from '@nestjs/swagger';
import { CreateMusicCollectionDto } from './create-music-collection.dto';

export class UpdateMusicCollectionDto extends PartialType(CreateMusicCollectionDto) {}
