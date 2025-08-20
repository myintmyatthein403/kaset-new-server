import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/modules/user-services/permission/entities/permission.entity';
import { Role } from 'src/modules/user-services/role/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionAutoRegisterService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Permission) private readonly permRepo: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly metadataScanner: MetadataScanner,
  ) { }

  async onApplicationBootstrap() {
    const routes = await this.getAllRoutes();

    for (const route of routes) {
      // Check if already exists in permission table
      const exists = await this.permRepo.findOne({ where: { api: route.path } });
      if (!exists) {
        const roles = await this.roleRepo.find();
        const perms = roles.map((role) =>
          this.permRepo.create({
            role,
            api: route.path,
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false,
          }),
        );
        await this.permRepo.save(perms);
      }
    }
  }

  async getAllRoutes() {
    const routes: { path: string; method: string }[] = [];
    const appModule = (await import('./../../../app.module')).AppModule;
    const controllers = Reflect.getMetadata('controllers', appModule) || [];

    for (const ctrl of controllers) {
      const prefix = Reflect.getMetadata('path', ctrl) || '';
      const proto = ctrl.prototype;
      this.metadataScanner.scanFromPrototype(
        ctrl,
        proto,
        (method) => {
          const routePath = Reflect.getMetadata('path', proto[method]);
          const methodType = Reflect.getMetadata('method', proto[method]);
          if (routePath && methodType) {
            routes.push({ path: `${prefix}/${routePath}`, method: methodType });
          }
        },
      );
    }
    return routes;
  }
}
