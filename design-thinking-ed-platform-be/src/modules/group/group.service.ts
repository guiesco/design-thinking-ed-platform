import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { extractRelations } from 'src/common/utils/extractRelations';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  create(createDto: CreateGroupDto) {
    return this.groupRepository.save(createDto);
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }

  find(
    query: FindOptionsWhere<GroupEntity> | FindOptionsWhere<GroupEntity>[],
    take: number,
    skip: number,
  ) {
    const relations = extractRelations(query);

    return this.groupRepository.find({
      relations,
      where: query,
      take: take,
      skip: skip,
    });
  }
}
