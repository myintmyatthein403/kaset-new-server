import { DeepPartial, FindOptionsOrderValue, In, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginationOptions, PaginatedResult } from '../utils/pagination.util';
import { buildWhereCondition } from '../utils/fitler.util';

export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) { }

  async findAll(
    relations: string[] = [],
    filters: Record<string, any> = {},
    options: PaginationOptions = { page: 1, limit: 10000 }
  ): Promise<PaginatedResult<T>> {
    const page = options.page ? Math.max(1, options.page) : 1;
    const limit = options.limit ? Math.max(1, options.limit) : 10000;
    const skip = (page - 1) * limit;

    const whereClause = buildWhereCondition(filters);
    const [data, totalItems] = await this.repository.findAndCount({
      where: whereClause,
      relations: relations,
      take: limit,
      skip: skip,
      order: {
        createdAt: "DESC"
      } as any
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

  async findOne(id: string, relations: string[] = [], filters: Record<string, any> = {}): Promise<T> {
    const whereClause = buildWhereCondition({
      id: id,
      ...filters,
    });
    const entity = await this.repository.findOne({
      where: whereClause,
      relations,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found.`);
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      return await this.repository.save(entity as DeepPartial<T>);
    } catch (error) {
      if (error.code == "23505") {
        throw new ConflictException('Duplicate')
      }
      throw new Error(error)
    }
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found.`);
    }
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found.`);
    }
    return true;
  }

  async deleteMany({ ids }: { ids: string[] }) {
    if (ids.length === 0) {
      throw new NotFoundException(`Entity not found.`);
    }
    const result = await this.repository.delete({ id: In(ids) as any });

    if (result.affected === 0) {
      throw new NotFoundException(`Entity not found.`);
    }
    return result.affected
  }


}
