import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Route, Prisma } from '@prisma/client';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async createRoute(data: Prisma.RouteCreateInput): Promise<Route> {
    return this.prisma.route.create({
      data,
    });
  }

  async getRoute(routeId: string): Promise<Route> {
    return this.prisma.route.findUnique({
      where: { id: routeId },
    });
  }

  async getRoutes(): Promise<Route[]> {
    return this.prisma.route.findMany();
  }

  async updateRoute(params: {
    where: Prisma.RouteWhereUniqueInput;
    data: Prisma.RouteUpdateInput;
  }): Promise<Route> {
    const { data, where } = params;
    return this.prisma.route.update({
      data,
      where,
    });
  }

  async deleteRoute(where: Prisma.RouteWhereUniqueInput): Promise<Route> {
    return this.prisma.route.delete({
      where,
    });
  }
}
