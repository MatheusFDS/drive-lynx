import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DriverPayment, Prisma } from '@prisma/client';

@Injectable()
export class DriverPaymentsService {
  constructor(private prisma: PrismaService) {}

  async createDriverPayment(data: Prisma.DriverPaymentCreateInput): Promise<DriverPayment> {
    return this.prisma.driverPayment.create({
      data,
    });
  }

  async getDriverPayment(driverPaymentId: string): Promise<DriverPayment> {
    return this.prisma.driverPayment.findUnique({
      where: { id: driverPaymentId },
    });
  }

  async getDriverPayments(): Promise<DriverPayment[]> {
    return this.prisma.driverPayment.findMany();
  }

  async updateDriverPayment(params: {
    where: Prisma.DriverPaymentWhereUniqueInput;
    data: Prisma.DriverPaymentUpdateInput;
  }): Promise<DriverPayment> {
    const { data, where } = params;
    return this.prisma.driverPayment.update({
      data,
      where,
    });
  }

  async deleteDriverPayment(where: Prisma.DriverPaymentWhereUniqueInput): Promise<DriverPayment> {
    return this.prisma.driverPayment.delete({
      where,
    });
  }
}
