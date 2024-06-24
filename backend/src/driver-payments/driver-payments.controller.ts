import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DriverPaymentsService } from './driver-payments.service';
import { DriverPayment as DriverPaymentModel, Prisma } from '@prisma/client';

@Controller('driver-payments')
export class DriverPaymentsController {
  constructor(private readonly driverPaymentsService: DriverPaymentsService) {}

  @Post()
  async createDriverPayment(@Body() driverPaymentData: Prisma.DriverPaymentCreateInput): Promise<DriverPaymentModel> {
    return this.driverPaymentsService.createDriverPayment(driverPaymentData);
  }

  @Get(':id')
  async getDriverPayment(@Param('id') id: string): Promise<DriverPaymentModel> {
    return this.driverPaymentsService.getDriverPayment(id);
  }

  @Get()
  async getDriverPayments(): Promise<DriverPaymentModel[]> {
    return this.driverPaymentsService.getDriverPayments();
  }
}
