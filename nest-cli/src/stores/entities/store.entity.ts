import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rating } from '../../ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 400 })
  address: string;

  @ManyToOne(() => User, { eager: true }) // eager fetch for simplicity
  owner: User;

  @OneToMany(() => Rating, rating => rating.store)
  ratings: Rating[];
}