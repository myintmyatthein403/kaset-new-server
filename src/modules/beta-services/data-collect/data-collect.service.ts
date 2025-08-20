import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { DataCollect } from './entities/data-collect.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildWhereCondition } from 'src/common/utils/fitler.util';
import { PaginationOptions, PaginatedResult } from 'src/common/utils/pagination.util';

@Injectable()
export class DataCollectService extends BaseService<DataCollect> {
  constructor(
    @InjectRepository(DataCollect)
    private readonly dataCollectRepository: Repository<DataCollect>,
  ) {
    super(dataCollectRepository);
  }

  async findWithCreatedBy(
    relations: string[] = [],
    filters: Record<string, any> = {},
    options: PaginationOptions = { page: 1, limit: 10 }
  ) {
    const page = options.page ? Math.max(1, options.page) : 1;
    const limit = options.limit ? Math.max(1, options.limit) : 10;
    const skip = (page - 1) * limit;
    const dataCollect = await this.dataCollectRepository.find({
      where: filters
    })

    console.log(dataCollect)

    const [data, totalItems] = await this.dataCollectRepository.findAndCount({
      where: filters,
      relations: relations,
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(totalItems / limit);
    const itemCount = data.length;

    return {
      data,
      meta: {
        totalItems,
        itemCount,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }
}
