import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repo.create({ ...createUserDto, password: passwordHash });
    return this.repo.save(user);
  }

  async findAll(filter?: Partial<User>) {
    return this.repo.find({ where: filter });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    user.password = await bcrypt.hash(dto.newPassword, 10);
    return this.repo.save(user);
  }
}
