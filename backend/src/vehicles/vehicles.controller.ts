import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle as VehicleModel, Prisma } from '@prisma/client';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async createVehicle(@Body() vehicleData: Prisma.VehicleCreateInput): Promise<VehicleModel> {
    return this.vehiclesService.createVehicle(vehicleData);
  }

  @Get(':id')
  async getVehicle(@Param('id') id: string): Promise<VehicleModel> {
    return this.vehiclesService.getVehicle(id);
  }

  @Get()
  async getVehicles(): Promise<VehicleModel[]> {
    return this.vehiclesService.getVehicles();
  }
}
