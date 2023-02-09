import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Groups } from '../../Groups/entities/Groups.entity';
import { Post } from '../../entity/Post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @ManyToMany(() => User, (utenti) => utenti.followedUsers)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (utenti) => utenti.followers)
  @JoinTable()
  followedUsers: User[];

  @ManyToMany(() => Groups, (gruppo) => gruppo.id)
  @JoinTable()
  iscritto: Groups[];
}
