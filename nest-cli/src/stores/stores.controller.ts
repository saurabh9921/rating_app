import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { FilterStoreDto } from './dto/filter-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
// import { Role } from '../common/enums/roles.enum';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filter: FilterStoreDto) {
    return this.storesService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }
}