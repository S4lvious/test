import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../Users/entities/User.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  img: string;

  @Column()
  createdAt: string;

  // @ManyToOne(() => User, (user) => user.posts)
  // user: User;
}
