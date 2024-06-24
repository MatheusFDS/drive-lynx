import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { Region as RegionModel, Prisma } from '@prisma/client';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async createRegion(@Body() regionData: Prisma.RegionCreateInput): Promise<RegionModel> {
    return this.regionsService.createRegion(regionData);
  }

  @Get(':id')
  async getRegion(@Param('id') id: string): Promise<RegionModel> {
    return this.regionsService.getRegion(id);
  }

  @Get()
  async getRegions(): Promise<RegionModel[]> {
    return this.regionsService.getRegions();
  }
}
