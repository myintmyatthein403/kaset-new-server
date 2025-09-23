import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ApiToken } from './entities/api-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from 'src/common/services/token/token.service';

@Injectable()
export class ApiTokenService extends BaseService<ApiToken> {
  constructor(
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<ApiToken>,

    private readonly tokenService: TokenService,
  ) {
    super(apiTokenRepository)
  }

  async createApiKey(data: { client_name: string, is_active: boolean }) {
    const key = this.tokenService.generateApiKey();
    const apiToken = this.apiTokenRepository.create({
      key,
      ...data,
    });
    return this.apiTokenRepository.save(apiToken);
  }
}
