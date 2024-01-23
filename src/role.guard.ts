/* eslint-disable prettier/prettier */


import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "./auth/schemas/user.schema";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.role?.split(',');

    // Allow unrestricted access for Role.Reader
    if (roles.includes(UserRole.Guest)) {
        return true;
    }
    return this.validateRoles(roles, userRoles);
  }

  validateRoles(roles: UserRole[], userRoles: string[]) {
    return roles.some(role => userRoles?.includes(role));
  }
}