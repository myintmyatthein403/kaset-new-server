import { Controller } from '@nestjs/common';
import { GenresService } from './genres.service';
import { BaseController } from 'src/common/base/base.controller';
import { Genre } from './entities/genre.entity';

@Controller('genres')
export class GenresController extends BaseController<Genre> {
  constructor(private readonly genresService: GenresService) { super(genresService) }
}
