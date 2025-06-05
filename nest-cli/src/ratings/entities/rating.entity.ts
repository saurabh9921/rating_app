import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity()
@Unique(['user', 'store'])
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @ManyToOne(() => User, user => user.id, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Store, store => store.ratings, { eager: true, onDelete: 'CASCADE' })
  store: Store;
}