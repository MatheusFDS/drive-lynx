import { Controller, Patch, Get, Post, Body, Param, Delete, Put, UseGuards, Request, ForbiddenException, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Patch(':id/password')
  @Roles(Role.Admin, Role.SuperAdmin)
  async updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    this.logger.debug(`Updating password for user ID: ${id}`);
    return this.usersService.updatePassword(id, updatePasswordDto.password);
  }

  @Post()
  @Roles(Role.Admin, Role.SuperAdmin)
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.debug('Creating a new user');
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  async findAll(@Request() req) {
    this.logger.debug('Fetching all users');
    this.logger.debug(`User role: ${req.user.roleId}`);
    this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
    if (req.user.roleId === Role.SuperAdmin) {
      return this.usersService.findAll();
    }
    return this.usersService.findAllByTenant(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async findOne(@Param('id') id: string, @Request() req) {
    this.logger.debug(`Fetching user with ID: ${id}`);
    this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
    const user = await this.usersService.findOne(id);
    if (req.user.roleId === Role.SuperAdmin || user.tenantId === req.user.tenantId) {
      return user;
    }
    throw new ForbiddenException('You do not have access to this user');
  }

  @Put(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    this.logger.debug(`Updating user with ID: ${id}`);
    this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
    const user = await this.usersService.findOne(id);
    if (req.user.roleId === Role.SuperAdmin || user.tenantId === req.user.tenantId) {
      return this.usersService.update(id, updateUserDto);
    }
    throw new ForbiddenException('You do not have access to update this user');
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async remove(@Param('id') id: string, @Request() req) {
    this.logger.debug(`Deleting user with ID: ${id}`);
    this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
    const user = await this.usersService.findOne(id);
    if (req.user.roleId === Role.SuperAdmin || user.tenantId === req.user.tenantId) {
      return this.usersService.remove(id);
    }
    throw new ForbiddenException('You do not have access to delete this user');
  }
}
