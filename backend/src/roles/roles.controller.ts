import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role as RoleModel, Prisma } from '@prisma/client';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() roleData: Prisma.RoleCreateInput): Promise<RoleModel> {
    return this.rolesService.createRole(roleData);
  }

  @Get(':id')
  async getRole(@Param('id') id: string): Promise<RoleModel> {
    return this.rolesService.getRole(id);
  }

  @Get()
  async getRoles(): Promise<RoleModel[]> {
    return this.rolesService.getRoles();
  }
}
