/* eslint-disable prettier/prettier */

import { SetMetadata } from '@nestjs/common';
import { Role } from './auth/schemas/user.schema';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
