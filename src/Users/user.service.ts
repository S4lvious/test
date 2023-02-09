import { Injectable } from '@nestjs/common';
import { Groups } from 'src/Groups/entities/Groups.entity';
import { User } from 'src/Users/entities/User.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}
  register(body) {
    try {
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.age = body.age;
      this.dataSource.getRepository(User).save(user);
      console.log('Saved a new user with id: ' + user.id);
    } catch (err) {
      console.log(err);
    }
  }

  async subscription(body) {
    const user = await this.dataSource.getRepository(User).findOne({
      relations: {
        iscritto: true,
      },
      where: {
        id: body.userId,
      },
    });
    const group = await this.dataSource.getRepository(Groups).findOne({
      relations: {
        participants: true,
      },
      where: {
        id: body.groupId,
      },
    });
    if (group.participants) await group.participants.push(user);
    else group.participants = [user];
    await this.dataSource.manager.save(group);
    if (user.iscritto) await user.iscritto.push(group);
    else user.iscritto = [group];
    await this.dataSource.manager.save(user);

    console.log('Okay!');
  }
}
