import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../Users/entities/User.entity';

@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupName: string;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  participants: User[];
}
