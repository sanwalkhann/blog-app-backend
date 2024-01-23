/* eslint-disable prettier/prettier */

import { SetMetadata } from '@nestjs/common';
import { UserRole } from './auth/schemas/user.schema';


export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);