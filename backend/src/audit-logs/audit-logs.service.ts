import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLog, Prisma } from '@prisma/client';

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async createAuditLog(data: Prisma.AuditLogCreateInput): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data,
    });
  }

  async getAuditLog(auditLogId: string): Promise<AuditLog> {
    return this.prisma.auditLog.findUnique({
      where: { id: auditLogId },
    });
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany();
  }

  async updateAuditLog(params: {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.AuditLogUpdateInput;
  }): Promise<AuditLog> {
    const { data, where } = params;
    return this.prisma.auditLog.update({
      data,
      where,
    });
  }

  async deleteAuditLog(where: Prisma.AuditLogWhereUniqueInput): Promise<AuditLog> {
    return this.prisma.auditLog.delete({
      where,
    });
  }
}
