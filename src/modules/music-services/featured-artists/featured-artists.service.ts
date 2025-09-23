import { Injectable } from '@nestjs/common';
import { CreateFeaturedArtistDto } from './dto/create-featured-artist.dto';
import { UpdateFeaturedArtistDto } from './dto/update-featured-artist.dto';
import { FeaturedArtist } from './entities/featured-artist.entity';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturedArtistsService extends BaseService<FeaturedArtist> {
  constructor(
    @InjectRepository(FeaturedArtist)
    private readonly featuredArtistRepository: Repository<FeaturedArtist>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(featuredArtistRepository)
  }

  async updateFeaturedArtist(id: string, data: any) {
    const artists = await Promise.all(data.artists.map(async (artist) => {
      return this.userRepository.findOne({
        where: {
          id: artist.id
        }
      })
    }))
    const featuredArtists = await this.featuredArtistRepository.findOne({
      where: {
        id
      }
    })

    if (!featuredArtists) {
      return this.featuredArtistRepository.save({
        id,
        artists
      })
    }

    featuredArtists.artists = artists
    return this.featuredArtistRepository.save(featuredArtists)
  }
}
