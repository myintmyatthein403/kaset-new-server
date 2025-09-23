import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiTags, ApiParam } from '@nestjs/swagger';
import { BaseController } from 'src/common/base/base.controller';
import { ApiToken } from './entities/api-token.entity';
import { ApiTokenService } from './api-token.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { JwtOrApiKeyGuard } from 'src/common/guards/jwt-or-api-key.guard';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@ApiTags('api-token')
@Controller('api-token')
export class ApiTokenController extends BaseController<ApiToken> {
  constructor(private readonly apiTokenService: ApiTokenService) {
    super(apiTokenService);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new API token (requires JWT)' })
  @ApiBody({ description: 'Entity data', type: Object })
  @ApiResponse({ status: 201, description: 'API token created successfully' })
  async create(@Body() data: { client_name: string, is_active: boolean }) {
    return this.apiTokenService.createApiKey(data);
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
    return this.apiTokenService.findAll(relationsArray as any, filterObject as any, { page, limit } as any);
  }

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

    return this.apiTokenService.findOne(id, relationsArray, filterObject);
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
    return this.apiTokenService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an entity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiResponse({ status: 200, description: 'Entity soft deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.apiTokenService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('hard/:id')
  @ApiOperation({ summary: 'Hard delete an entity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiResponse({ status: 200, description: 'Entity hard deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.apiTokenService.delete(id);
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
    return this.apiTokenService.deleteMany(body);
  }

}
