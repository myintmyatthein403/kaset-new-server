import { SetMetadata } from '@nestjs/common';
export const OwnerCheck = (serviceName: string, idParam: string) =>
  SetMetadata('owner-check-key', { serviceName, idParam });
