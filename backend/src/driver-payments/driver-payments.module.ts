import { Module } from '@nestjs/common';
import { DriverPaymentsService } from './driver-payments.service';
import { DriverPaymentsController } from './driver-payments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DriverPaymentsService],
  controllers: [DriverPaymentsController],
})
export class DriverPaymentsModule {}
