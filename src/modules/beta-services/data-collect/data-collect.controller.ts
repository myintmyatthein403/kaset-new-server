import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { DataCollectService } from './data-collect.service';
import { BaseController } from 'src/common/base/base.controller';
import { DataCollect } from './entities/data-collect.entity';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { DataOwnerGuard } from 'src/common/guards/owner.guard';
import { User } from 'src/common/decorators/user.decorator';
import { DeepPartial } from 'typeorm';

@Controller('data-collect')
export class DataCollectController extends BaseController<DataCollect> {
  constructor(private readonly dataCollectService: DataCollectService) { super(dataCollectService) }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all entities with filtering, relations, and pagination' })
  @ApiQuery({ name: 'relations', required: false, description: 'Comma-separated related entities to include' })
  @ApiQuery({ name: 'filters', required: false, description: 'JSON object for filtering entities (e.g., {"name": "Test"})', type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Current page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Paginated and filtered list of entities' })
  async findData(
    @Query('relations') relations?: string,
    @Query('filters') filters?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @User() user?: any
  ) {
    const relationsArray = relations ? relations.split(',') : [];
    let filterObject = {};
    if (filters) {
      try {
        filterObject = JSON.parse(filters);
      } catch (e) {
        throw new BadRequestException('Invalid filters JSON format.');
      }
    }
    filterObject = {
      ...filterObject,
      created_by: {
        id: user.user_id
      }
    }
    return this.dataCollectService.findWithCreatedBy(relationsArray, filterObject, { page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new entity' })
  @ApiBody({ description: 'Entity data', type: Object })
  @ApiResponse({ status: 201, description: 'Entity created successfully' })
  async create(
    @Body() data: DataCollect,
    @User() user?: any
  ) {
    return this.dataCollectService.create({
      ...data,
      created_by: {
        id: user.user_id
      }
    });
  }
}
