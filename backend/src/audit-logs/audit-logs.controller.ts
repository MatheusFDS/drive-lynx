import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuditLog as AuditLogModel, Prisma } from '@prisma/client';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  async createAuditLog(@Body() auditLogData: Prisma.AuditLogCreateInput): Promise<AuditLogModel> {
    return this.auditLogsService.createAuditLog(auditLogData);
  }

  @Get(':id')
  async getAuditLog(@Param('id') id: string): Promise<AuditLogModel> {
    return this.auditLogsService.getAuditLog(id);
  }

  @Get()
  async getAuditLogs(): Promise<AuditLogModel[]> {
    return this.auditLogsService.getAuditLogs();
  }
}
