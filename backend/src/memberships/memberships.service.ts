import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Membership, Prisma } from '@prisma/client';

@Injectable()
export class MembershipsService {
  constructor(private prisma: PrismaService) {}

  async createMembership(data: Prisma.MembershipCreateInput): Promise<Membership> {
    return this.prisma.membership.create({
      data,
    });
  }

  async getMembership(membershipId: string): Promise<Membership> {
    return this.prisma.membership.findUnique({
      where: { id: membershipId },
    });
  }

  async getMemberships(): Promise<Membership[]> {
    return this.prisma.membership.findMany();
  }

  async updateMembership(params: {
    where: Prisma.MembershipWhereUniqueInput;
    data: Prisma.MembershipUpdateInput;
  }): Promise<Membership> {
    const { data, where } = params;
    return this.prisma.membership.update({
      data,
      where,
    });
  }

  async deleteMembership(where: Prisma.MembershipWhereUniqueInput): Promise<Membership> {
    return this.prisma.membership.delete({
      where,
    });
  }
}
