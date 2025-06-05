import { Role } from 'src/common/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Role } from '../../common/enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 400 })
  address: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}