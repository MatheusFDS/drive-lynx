import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission as PermissionModel, Prisma } from '@prisma/client';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(@Body() permissionData: Prisma.PermissionCreateInput): Promise<PermissionModel> {
    return this.permissionsService.createPermission(permissionData);
  }

  @Get(':id')
  async getPermission(@Param('id') id: string): Promise<PermissionModel> {
    return this.permissionsService.getPermission(id);
  }

  @Get()
  async getPermissions(): Promise<PermissionModel[]> {
    return this.permissionsService.getPermissions();
  }
}
