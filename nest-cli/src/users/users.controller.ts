import {
  Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
// import { Role } from '../common/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() filter: any) {
    return this.usersService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-password/:id')
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(+id, dto);
  }
}