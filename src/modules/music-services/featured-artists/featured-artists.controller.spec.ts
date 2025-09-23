import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedArtistsController } from './featured-artists.controller';
import { FeaturedArtistsService } from './featured-artists.service';

describe('FeaturedArtistsController', () => {
  let controller: FeaturedArtistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturedArtistsController],
      providers: [FeaturedArtistsService],
    }).compile();

    controller = module.get<FeaturedArtistsController>(FeaturedArtistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
