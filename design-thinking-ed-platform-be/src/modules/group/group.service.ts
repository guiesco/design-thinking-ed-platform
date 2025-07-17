import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { extractRelations } from 'src/common/utils/extractRelations';
import { ProjectService } from '../project/project.service';
import { CreateProjectDto } from '../project/dto/create-project.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly projectService: ProjectService,
  ) {}

  async create(createDto: CreateGroupDto): Promise<GroupEntity> {
    const group = await this.groupRepository.save(createDto);

    // Criar projeto para o grupo
    const createProjectDto: CreateProjectDto = {
      groupId: group.id,
    };

    await this.projectService.create(createProjectDto);

    return group;
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: number) {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }

  find(
    query: FindOptionsWhere<GroupEntity> | FindOptionsWhere<GroupEntity>[],
    take: number,
    skip: number,
  ) {
    console.log('🚀 ~ GroupService ~ query:', query);
    const relations = extractRelations(query);
    console.log('🚀 ~ GroupService ~ relations:', relations);

    return this.groupRepository.find({
      relations,
      where: query,
      take: take,
      skip: skip,
    });
  }
}
