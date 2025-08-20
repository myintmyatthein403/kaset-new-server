import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base/base.controller';

@Controller('roles')
@ApiTags('Roles')
export class RoleController extends BaseController<Role> {
  constructor(
    private readonly roleService: RoleService,
  ) {
    super(roleService);
  }
}
