import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission, Prisma } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async createPermission(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }

  async getPermission(permissionId: string): Promise<Permission> {
    return this.prisma.permission.findUnique({
      where: { id: permissionId },
    });
  }

  async getPermissions(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async updatePermission(params: {
    where: Prisma.PermissionWhereUniqueInput;
    data: Prisma.PermissionUpdateInput;
  }): Promise<Permission> {
    const { data, where } = params;
    return this.prisma.permission.update({
      data,
      where,
    });
  }

  async deletePermission(where: Prisma.PermissionWhereUniqueInput): Promise<Permission> {
    return this.prisma.permission.delete({
      where,
    });
  }
}
