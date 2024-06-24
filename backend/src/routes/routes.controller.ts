import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route as RouteModel, Prisma } from '@prisma/client';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async createRoute(@Body() routeData: Prisma.RouteCreateInput): Promise<RouteModel> {
    return this.routesService.createRoute(routeData);
  }

  @Get(':id')
  async getRoute(@Param('id') id: string): Promise<RouteModel> {
    return this.routesService.getRoute(id);
  }

  @Get()
  async getRoutes(): Promise<RouteModel[]> {
    return this.routesService.getRoutes();
  }
}
