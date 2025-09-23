import { PartialType } from '@nestjs/swagger';
import { CreateFeaturedArtistDto } from './create-featured-artist.dto';

export class UpdateFeaturedArtistDto extends PartialType(CreateFeaturedArtistDto) {}
