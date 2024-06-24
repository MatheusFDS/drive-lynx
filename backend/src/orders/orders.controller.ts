import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order as OrderModel, Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderData: Prisma.OrderCreateInput): Promise<OrderModel> {
    return this.ordersService.createOrder(orderData);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<OrderModel> {
    return this.ordersService.getOrder(id);
  }

  @Get()
  async getOrders(): Promise<OrderModel[]> {
    return this.ordersService.getOrders();
  }
}
