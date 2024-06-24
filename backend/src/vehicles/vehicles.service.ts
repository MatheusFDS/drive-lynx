import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Vehicle, Prisma } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async createVehicle(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return this.prisma.vehicle.create({
      data,
    });
  }

  async getVehicle(vehicleId: string): Promise<Vehicle> {
    return this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
  }

  async getVehicles(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany();
  }

  async updateVehicle(params: {
    where: Prisma.VehicleWhereUniqueInput;
    data: Prisma.VehicleUpdateInput;
  }): Promise<Vehicle> {
    const { data, where } = params;
    return this.prisma.vehicle.update({
      data,
      where,
    });
  }

  async deleteVehicle(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    return this.prisma.vehicle.delete({
      where,
    });
  }
}
