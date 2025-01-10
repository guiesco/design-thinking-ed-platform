import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsEntity } from './entities/group.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity) 
    private readonly groupsRepository: Repository<GroupsEntity>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupsRepository.save(createGroupDto);
  }

  findAll() {
    return this.groupsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }

  find(
    query: FindOptionsWhere<GroupsEntity> | FindOptionsWhere<GroupsEntity>[],
    take: number,
    skip: number,
  ) {
    const extractRelations = (queryObj: any, parentKey: string = ''): string[] => {
      let relations: string[] = [];
      Object.keys(queryObj).forEach((key) => {
        const value = queryObj[key];
        const relationKey = parentKey ? `${parentKey}.${key}` : key;
  
        if (typeof value === 'object' && value !== null) {
          relations.push(relationKey);
          relations = relations.concat(extractRelations(value, relationKey));
        } else if (!parentKey) {
          relations.push(key);
        }
      });
      return relations;
    };
  
    const relations = extractRelations(query);
  
    return this.groupsRepository.find({
      relations,
      loadRelationIds: true,
      where: query,
      take: take,
      skip: skip,
    });
  }
}
