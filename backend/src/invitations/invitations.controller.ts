import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation as InvitationModel, Prisma } from '@prisma/client';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async createInvitation(@Body() invitationData: Prisma.InvitationCreateInput): Promise<InvitationModel> {
    return this.invitationsService.createInvitation(invitationData);
  }

  @Get(':id')
  async getInvitation(@Param('id') id: string): Promise<InvitationModel> {
    return this.invitationsService.getInvitation(id);
  }

  @Get()
  async getInvitations(): Promise<InvitationModel[]> {
    return this.invitationsService.getInvitations();
  }
}
