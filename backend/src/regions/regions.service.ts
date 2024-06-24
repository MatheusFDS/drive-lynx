import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Region, Prisma } from '@prisma/client';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async createRegion(data: Prisma.RegionCreateInput): Promise<Region> {
    return this.prisma.region.create({
      data,
    });
  }

  async getRegion(regionId: string): Promise<Region> {
    return this.prisma.region.findUnique({
      where: { id: regionId },
    });
  }

  async getRegions(): Promise<Region[]> {
    return this.prisma.region.findMany();
  }

  async updateRegion(params: {
    where: Prisma.RegionWhereUniqueInput;
    data: Prisma.RegionUpdateInput;
  }): Promise<Region> {
    const { data, where } = params;
    return this.prisma.region.update({
      data,
      where,
    });
  }

  async deleteRegion(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    return this.prisma.region.delete({
      where,
    });
  }
}
