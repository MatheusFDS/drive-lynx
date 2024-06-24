import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver as DriverModel, Prisma } from '@prisma/client';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async createDriver(@Body() driverData: Prisma.DriverCreateInput): Promise<DriverModel> {
    return this.driversService.createDriver(driverData);
  }

  @Get(':id')
  async getDriver(@Param('id') id: string): Promise<DriverModel> {
    return this.driversService.getDriver(id);
  }

  @Get()
  async getDrivers(): Promise<DriverModel[]> {
    return this.driversService.getDrivers();
  }
}
