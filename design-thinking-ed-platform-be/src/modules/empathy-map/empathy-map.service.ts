import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpathyMap } from './entities/empathy-map.entity';
import { CreateEmpathyMapDto } from './dto/create-empathy-map.dto';

@Injectable()
export class EmpathyMapService {
  constructor(
    @InjectRepository(EmpathyMap)
    private readonly empathyMapRepository: Repository<EmpathyMap>,
  ) {}

  create(createDto: CreateEmpathyMapDto): Promise<EmpathyMap> {
    const empathyMap = this.empathyMapRepository.create(createDto);
    return this.empathyMapRepository.save(empathyMap);
  }

  findAllByProject(projectId: number): Promise<EmpathyMap[]> {
    return this.empathyMapRepository.find({
      where: { projectId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<EmpathyMap> {
    return this.empathyMapRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async upvote(id: number): Promise<EmpathyMap> {
    const empathyMap = await this.findOne(id);
    empathyMap.upvotes += 1;
    return this.empathyMapRepository.save(empathyMap);
  }

  async downvote(id: number): Promise<EmpathyMap> {
    const empathyMap = await this.findOne(id);
    empathyMap.downvotes += 1;
    return this.empathyMapRepository.save(empathyMap);
  }

  async toggleSelection(id: number): Promise<EmpathyMap> {
    const empathyMap = await this.findOne(id);
    empathyMap.isSelected = !empathyMap.isSelected;
    return this.empathyMapRepository.save(empathyMap);
  }

  async getSelectedByProject(projectId: number): Promise<EmpathyMap[]> {
    return this.empathyMapRepository.find({
      where: { projectId, isSelected: true },
      relations: ['user'],
    });
  }
}
