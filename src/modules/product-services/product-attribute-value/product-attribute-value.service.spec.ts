import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeValueService } from './product-attribute-value.service';

describe('ProductAttributeValueService', () => {
  let service: ProductAttributeValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAttributeValueService],
    }).compile();

    service = module.get<ProductAttributeValueService>(ProductAttributeValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
