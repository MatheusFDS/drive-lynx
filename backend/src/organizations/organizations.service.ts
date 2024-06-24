import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Organization, Prisma } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    });
  }

  async getOrganization(organizationId: string): Promise<Organization> {
    return this.prisma.organization.findUnique({
      where: { id: organizationId },
    });
  }

  async getOrganizations(): Promise<Organization[]> {
    return this.prisma.organization.findMany();
  }

  async updateOrganization(params: {
    where: Prisma.OrganizationWhereUniqueInput;
    data: Prisma.OrganizationUpdateInput;
  }): Promise<Organization> {
    const { data, where } = params;
    return this.prisma.organization.update({
      data,
      where,
    });
  }

  async deleteOrganization(where: Prisma.OrganizationWhereUniqueInput): Promise<Organization> {
    return this.prisma.organization.delete({
      where,
    });
  }
}
