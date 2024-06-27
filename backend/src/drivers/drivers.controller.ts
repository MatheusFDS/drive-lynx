import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver as DriverModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDriverDto, UpdateDriverDto } from './dto/driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDriver(@Body() createDriverDto: CreateDriverDto): Promise<DriverModel> {
    return this.driversService.createDriver(createDriverDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDriver(@Param('id') id: string): Promise<DriverModel> {
    return this.driversService.getDriver(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDrivers(): Promise<DriverModel[]> {
    return this.driversService.getDrivers();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateDriver(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto): Promise<DriverModel> {
    return this.driversService.updateDriver({ where: { id }, data: updateDriverDto });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteDriver(@Param('id') id: string): Promise<DriverModel> {
    return this.driversService.deleteDriver({ id });
  }
}
