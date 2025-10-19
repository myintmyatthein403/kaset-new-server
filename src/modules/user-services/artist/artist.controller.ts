import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtOrApiKeyGuard } from 'src/common/guards/jwt-or-api-key.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @UseGuards(JwtOrApiKeyGuard)
  @Get()
  findAll(
    @Query() query: any
  ) {
    return this.artistService.findAll(query?.name);
  }




  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.artistService.findWithSlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateArtistDto: any,
  ) {
    return this.artistService.updateStatus(id, updateArtistDto.status as ACCOUNT_STATUS);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}
