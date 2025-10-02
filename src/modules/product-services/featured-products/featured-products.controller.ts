import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { FeaturedProductsService } from './featured-products.service';
import { ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtOrApiKeyGuard } from 'src/common/guards/jwt-or-api-key.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Controller('featured-products')
export class FeaturedProductsController {
  constructor(
    private readonly baseService: FeaturedProductsService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new API token (requires JWT)' })
  @ApiBody({ description: 'Entity data', type: Object })
  @ApiResponse({ status: 201, description: 'API token created successfully' })
  async create(@Body() data: any) {
    return this.baseService.create(data);
  }

  @UseGuards(JwtOrApiKeyGuard)
  @Get()
  @ApiOperation({ summary: 'Get all API tokens (requires JWT)' })
  @ApiQuery({ name: 'relations', required: false, description: 'Comma-separated related entities to include' })
  @ApiQuery({ name: 'filters', required: false, description: 'JSON object for filtering entities (e.g., {"name": "Test"})', type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Current page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Paginated and filtered list of entities' })
  async findAll(
    @Query('relations') relations?: string,
    @Query('filters') filters?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10000,
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
    // Pass the arguments explicitly.
    return this.baseService.findAll(relationsArray as any, filterObject as any, { page, limit } as any);
  }

  @UseGuards(JwtOrApiKeyGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get entity by ID with filtering on relations' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiQuery({ name: 'relations', required: false, description: 'Comma-separated related entities to include' })
  @ApiQuery({ name: 'filters', required: false, description: 'JSON object for filtering entities (e.g., {"name": "Test"})', type: 'string' })
  @ApiResponse({ status: 200, description: 'Entity found' })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
    @Query('filters') filters?: string,
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

    return this.baseService.findOne(id, relationsArray, filterObject);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an entity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiBody({ description: 'Partial entity data to update', type: Object })
  @ApiResponse({ status: 200, description: 'Entity updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() data: QueryDeepPartialEntity<ApiToken>,
  ) {
    return this.baseService.updateFeaturedProduct(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an entity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiResponse({ status: 200, description: 'Entity soft deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.baseService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('hard/:id')
  @ApiOperation({ summary: 'Hard delete an entity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiResponse({ status: 200, description: 'Entity hard deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.baseService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple entities by IDs' })
  @ApiBody({
    description: 'List of entity IDs to delete',
    schema: { example: { ids: ['uuid-1', 'uuid-2'] } },
  })
  @ApiResponse({ status: 200, description: 'Entities deleted successfully' })
  async deleteMany(@Body() body: { ids: string[] }) {
    return this.baseService.deleteMany(body);
  }
}

