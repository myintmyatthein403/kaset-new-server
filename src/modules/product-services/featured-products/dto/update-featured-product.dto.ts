import { PartialType } from '@nestjs/swagger';
import { CreateFeaturedProductDto } from './create-featured-product.dto';

export class UpdateFeaturedProductDto extends PartialType(CreateFeaturedProductDto) {}
