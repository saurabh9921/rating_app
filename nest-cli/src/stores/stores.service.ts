import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { FilterStoreDto } from './dto/filter-store.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private repo: Repository<Store>) {}
      @InjectRepository(User) private userRepo: Repository<User> 

  // create(createStoreDto: CreateStoreDto) {
  //   const store = this.repo.create(createStoreDto);
  //   return this.repo.save(store);
  // }
   async create(createStoreDto: CreateStoreDto) {
    const { userId, ...storeData } = createStoreDto;

    const owner = await this.userRepo.findOne({ where: { id: userId } });
    if (!owner) {
      throw new Error('User not found');
    }

    const store = this.repo.create({ ...storeData, owner });
    return this.repo.save(store);
  }

  // findAll(filter?: FilterStoreDto) {
  //   const where = {};
  //   if (filter?.name) where['name'] = Like(`%${filter.name}%`);
  //   if (filter?.address) where['address'] = Like(`%${filter.address}%`);
  //   return this.repo.find({ where });
  // }
  // stores.service.ts
// async findAll(filter: FilterStoreDto): Promise<Store[]> {
//   const query = this.repo.createQueryBuilder('store');

//   // Optional: add filtering logic based on `filter` if needed

//   return await query
//     .leftJoinAndSelect('store.ratings', 'rating') // join ratings
//     .getMany();
// }

async findAll(filter: FilterStoreDto): Promise<any[]> {
  const query = this.repo
    .createQueryBuilder('store')
    .leftJoin('store.ratings', 'rating')
    .select([
      'store.id AS id',
      'store.name AS name',
      'store.email AS email',
      'store.address AS address',
      'COALESCE(AVG(rating.rating), 0) AS averageRating',
    ])
    .groupBy('store.id');

  return await query.getRawMany();
}




  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['ratings'] });
  }
}
