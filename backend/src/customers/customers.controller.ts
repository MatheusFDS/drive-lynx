import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer as CustomerModel, Prisma } from '@prisma/client';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() customerData: Prisma.CustomerCreateInput): Promise<CustomerModel> {
    return this.customersService.createCustomer(customerData);
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<CustomerModel> {
    return this.customersService.getCustomer(id);
  }

  @Get()
  async getCustomers(): Promise<CustomerModel[]> {
    return this.customersService.getCustomers();
  }
}
