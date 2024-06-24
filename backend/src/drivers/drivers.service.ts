import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Driver, Prisma } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async createDriver(data: Prisma.DriverCreateInput): Promise<Driver> {
    return this.prisma.driver.create({
      data,
    });
  }

  async getDriver(driverId: string): Promise<Driver> {
    return this.prisma.driver.findUnique({
      where: { id: driverId },
    });
  }

  async getDrivers(): Promise<Driver[]> {
    return this.prisma.driver.findMany();
  }

  async updateDriver(params: {
    where: Prisma.DriverWhereUniqueInput;
    data: Prisma.DriverUpdateInput;
  }): Promise<Driver> {
    const { data, where } = params;
    return this.prisma.driver.update({
      data,
      where,
    });
  }

  async deleteDriver(where: Prisma.DriverWhereUniqueInput): Promise<Driver> {
    return this.prisma.driver.delete({
      where,
    });
  }
}
