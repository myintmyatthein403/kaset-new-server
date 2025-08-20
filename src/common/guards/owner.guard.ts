import { Injectable } from '@nestjs/common';
import { BaseOwnerGuard } from './base-owner.guard';
import { DataCollectService } from 'src/modules/beta-services/data-collect/data-collect.service';
import { DataCollect } from 'src/modules/beta-services/data-collect/entities/data-collect.entity';

@Injectable()
export class DataOwnerGuard extends BaseOwnerGuard {
  constructor(private readonly dataCollectService: DataCollectService) {
    super();
  }

  protected getResource(id: string): Promise<DataCollect | undefined> {
    return this.dataCollectService.findOne(id);
  }
}
