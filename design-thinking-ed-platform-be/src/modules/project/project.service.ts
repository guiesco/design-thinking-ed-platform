import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { GroupEntity } from '../group/entities/group.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const group = await this.groupRepository.findOne({
      where: { id: createProjectDto.groupId },
    });

    if (!group) {
      throw new Error('Grupo não encontrado');
    }

    const project = this.projectRepository.create({
      group,
    });

    return this.projectRepository.save(project);
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['group'],
    });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: [
        'group',
        'empathyMap',
        'challengeDefinition',
        'problemDefinition',
      ],
    });
  }

  findOneByGroup(groupId: number) {
    return this.projectRepository.findOne({
      where: { group: { id: groupId } },
      relations: [
        'group',
        'empathyMap',
        'challengeDefinition',
        'problemDefinition',
      ],
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(id);

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    if (updateProjectDto.groupId) {
      const group = await this.groupRepository.findOne({
        where: { id: updateProjectDto.groupId },
      });

      if (!group) {
        throw new Error('Grupo não encontrado');
      }

      project.group = group;
    }

    return this.projectRepository.save(project);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
