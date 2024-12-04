import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { request } from 'http';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Put(':id')
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: UserRole,
    @Req() request: Request
  ) {
    return this.usersService.updateUserRole(id, role,request);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string , @Req() request: Request) {
    return this.usersService.removeUser(id,request);
  }
}