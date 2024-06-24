import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Invitation, Prisma } from '@prisma/client';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async createInvitation(data: Prisma.InvitationCreateInput): Promise<Invitation> {
    return this.prisma.invitation.create({
      data,
    });
  }

  async getInvitation(invitationId: string): Promise<Invitation> {
    return this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });
  }

  async getInvitations(): Promise<Invitation[]> {
    return this.prisma.invitation.findMany();
  }

  async updateInvitation(params: {
    where: Prisma.InvitationWhereUniqueInput;
    data: Prisma.InvitationUpdateInput;
  }): Promise<Invitation> {
    const { data, where } = params;
    return this.prisma.invitation.update({
      data,
      where,
    });
  }

  async deleteInvitation(where: Prisma.InvitationWhereUniqueInput): Promise<Invitation> {
    return this.prisma.invitation.delete({
      where,
    });
  }
}
