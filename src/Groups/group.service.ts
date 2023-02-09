import { Injectable } from '@nestjs/common';
import { Groups } from 'src/Groups/entities/Groups.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(private readonly dataSource: DataSource) {}
  create(body) {
    const group = new Groups();
    group.groupName = body.groupName;
    this.dataSource.getRepository(Groups).save(group);
  }
}
