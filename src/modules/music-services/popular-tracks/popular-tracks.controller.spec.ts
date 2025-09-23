import { Test, TestingModule } from '@nestjs/testing';
import { PopularTracksController } from './popular-tracks.controller';
import { PopularTracksService } from './popular-tracks.service';

describe('PopularTracksController', () => {
  let controller: PopularTracksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularTracksController],
      providers: [PopularTracksService],
    }).compile();

    controller = module.get<PopularTracksController>(PopularTracksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
