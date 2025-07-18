import { Role } from '@generated/prisma';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
