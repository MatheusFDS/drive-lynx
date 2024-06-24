import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Integration, Prisma } from '@prisma/client';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async createIntegration(data: Prisma.IntegrationCreateInput): Promise<Integration> {
    return this.prisma.integration.create({
      data,
    });
  }

  async getIntegration(integrationId: string): Promise<Integration> {
    return this.prisma.integration.findUnique({
      where: { id: integrationId },
    });
  }

  async getIntegrations(): Promise<Integration[]> {
    return this.prisma.integration.findMany();
  }

  async updateIntegration(params: {
    where: Prisma.IntegrationWhereUniqueInput;
    data: Prisma.IntegrationUpdateInput;
  }): Promise<Integration> {
    const { data, where } = params;
    return this.prisma.integration.update({
      data,
      where,
    });
  }

  async deleteIntegration(where: Prisma.IntegrationWhereUniqueInput): Promise<Integration> {
    return this.prisma.integration.delete({
      where,
    });
  }
}
