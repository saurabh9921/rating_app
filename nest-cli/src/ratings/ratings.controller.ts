import { Controller, Post, Body, Patch, Param, Get, Query, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() dto: CreateRatingDto) {
    return this.ratingsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRatingDto) {
    return this.ratingsService.update(+id, dto);
  }

  @Get('user-store')
  findByUserAndStore(@Query('userId') userId: string, @Query('storeId') storeId: string) {
    return this.ratingsService.findByUserAndStore(+userId, +storeId);
  }

  @Get('store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.ratingsService.findByStore(+storeId);
  }

  @Get('store/:storeId/average')
  getAverage(@Param('storeId') storeId: string) {
    return this.ratingsService.getAverageRating(+storeId);
  }

  @Get('user/:userId')
getRatingsByUser(@Param('userId') userId: string) {
  return this.ratingsService.findByUser(+userId);
}
@Patch()
updateByUserAndStore(@Body() body: { userId: number; storeId: number; rating: number }) {
  const { userId, storeId, rating } = body;
  return this.ratingsService.updateByUserAndStore(userId, storeId, rating);
}


}