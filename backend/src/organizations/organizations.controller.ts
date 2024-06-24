import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization as OrganizationModel, Prisma } from '@prisma/client';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async createOrganization(@Body() organizationData: Prisma.OrganizationCreateInput): Promise<OrganizationModel> {
    return this.organizationsService.createOrganization(organizationData);
  }

  @Get(':id')
  async getOrganization(@Param('id') id: string): Promise<OrganizationModel> {
    return this.organizationsService.getOrganization(id);
  }

  @Get()
  async getOrganizations(): Promise<OrganizationModel[]> {
    return this.organizationsService.getOrganizations();
  }
}
