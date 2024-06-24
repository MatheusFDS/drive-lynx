import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { Membership as MembershipModel, Prisma } from '@prisma/client';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  async createMembership(@Body() membershipData: Prisma.MembershipCreateInput): Promise<MembershipModel> {
    return this.membershipsService.createMembership(membershipData);
  }

  @Get(':id')
  async getMembership(@Param('id') id: string): Promise<MembershipModel> {
    return this.membershipsService.getMembership(id);
  }

  @Get()
  async getMemberships(): Promise<MembershipModel[]> {
    return this.membershipsService.getMemberships();
  }
}
