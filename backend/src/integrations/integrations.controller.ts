import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Integration as IntegrationModel, Prisma } from '@prisma/client';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  async createIntegration(@Body() integrationData: Prisma.IntegrationCreateInput): Promise<IntegrationModel> {
    return this.integrationsService.createIntegration(integrationData);
  }

  @Get(':id')
  async getIntegration(@Param('id') id: string): Promise<IntegrationModel> {
    return this.integrationsService.getIntegration(id);
  }

  @Get()
  async getIntegrations(): Promise<IntegrationModel[]> {
    return this.integrationsService.getIntegrations();
  }
}
