import { Test, TestingModule } from '@nestjs/testing';
import { MusicCollectionsController } from './music-collections.controller';
import { MusicCollectionsService } from './music-collections.service';

describe('MusicCollectionsController', () => {
  let controller: MusicCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicCollectionsController],
      providers: [MusicCollectionsService],
    }).compile();

    controller = module.get<MusicCollectionsController>(MusicCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
