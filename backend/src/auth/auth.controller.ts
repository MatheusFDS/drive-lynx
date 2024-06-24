// auth.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string, password: string, name: string, roleId: string, tenantId: string }) {
    const userCreateInput: Prisma.UserCreateInput = {
      email: body.email,
      password: body.password,
      name: body.name,
      role: { connect: { id: body.roleId } },
      tenant: { connect: { id: body.tenantId } },
    };
    return this.authService.register(userCreateInput);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
