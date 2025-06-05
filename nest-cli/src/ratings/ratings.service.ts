import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(@InjectRepository(Rating) private repo: Repository<Rating>) {}

  async create(dto: CreateRatingDto) {
    const rating = this.repo.create({
      rating: dto.rating,
      user: { id: dto.userId },
      store: { id: dto.storeId },
    });
    return this.repo.save(rating);
  }

  async update(id: number, dto: UpdateRatingDto) {
    const rating = await this.repo.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');
    rating.rating = dto.rating;
    return this.repo.save(rating);
  }

  async findByUserAndStore(userId: number, storeId: number) {
    return this.repo.findOne({ where: { user: { id: userId }, store: { id: storeId } } });
  }

  async findByStore(storeId: number) {
    return this.repo.find({ where: { store: { id: storeId } } });
  }

  async getAverageRating(storeId: number) {
    const result = await this.repo
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'avg')
      .where('rating.storeId = :storeId', { storeId })
      .getRawOne();
    return parseFloat(result.avg) || 0;
  }

  async findByUser(userId: number) {
  return this.repo.find({
    where: { user: { id: userId } },
    relations: ['store'], // Include store details in the result
  });
}

async updateByUserAndStore(userId: number, storeId: number, rating: number) {
  const existingRating = await this.repo.findOne({
    where: {
      user: { id: userId },
      store: { id: storeId },
    },
  });

  if (!existingRating) {
    throw new NotFoundException('Rating not found for this user and store');
  }

  existingRating.rating = rating;
  return await this.repo.save(existingRating);
}


}
