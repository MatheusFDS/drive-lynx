import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async getCustomer(customerId: string): Promise<Customer> {
    return this.prisma.customer.findUnique({
      where: { id: customerId },
    });
  }

  async getCustomers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { data, where } = params;
    return this.prisma.customer.update({
      data,
      where,
    });
  }

  async deleteCustomer(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
