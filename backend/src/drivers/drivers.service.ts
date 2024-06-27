import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Driver, Prisma } from '@prisma/client';
import { CreateDriverDto, UpdateDriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async createDriver(data: CreateDriverDto): Promise<Driver> {
    return this.prisma.driver.create({ data });
  }

  async getDriver(driverId: string): Promise<Driver> {
    return this.prisma.driver.findUnique({ where: { id: driverId } });
  }

  async getDrivers(): Promise<Driver[]> {
    return this.prisma.driver.findMany();
  }

  async updateDriver(params: { where: Prisma.DriverWhereUniqueInput; data: UpdateDriverDto }): Promise<Driver> {
    const { data, where } = params;
    return this.prisma.driver.update({ data, where });
  }

  async deleteDriver(where: Prisma.DriverWhereUniqueInput): Promise<Driver> {
    // Deletar pagamentos associados ao motorista
    await this.prisma.driverPayment.deleteMany({
      where: {
        driverId: where.id,
      },
    });

    // Deletar rotas associadas ao motorista
    await this.prisma.route.deleteMany({
      where: {
        driverId: where.id,
      },
    });

    // Deletar o motorista
    return this.prisma.driver.delete({
      where,
    });
  }
}
