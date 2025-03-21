import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpathyMap } from './entities/empathy-map.entity';
import { CreateEmpathyMapDto } from './dto/create-empathy-map.dto';
import {
  EmpathyMapResponse,
  ResponseType,
} from './entities/empathy-map-response.entity';
import { CreateEmpathyMapResponseDto } from './dto/create-empathy-map-response.dto';

@Injectable()
export class EmpathyMapService {
  constructor(
    @InjectRepository(EmpathyMap)
    private readonly empathyMapRepository: Repository<EmpathyMap>,
    @InjectRepository(EmpathyMapResponse)
    private readonly empathyMapResponseRepository: Repository<EmpathyMapResponse>,
  ) {}

  create(createDto: CreateEmpathyMapDto): Promise<EmpathyMap> {
    const empathyMap = this.empathyMapRepository.create(createDto);
    return this.empathyMapRepository.save(empathyMap);
  }

  createResponse(
    createDto: CreateEmpathyMapResponseDto,
  ): Promise<EmpathyMapResponse> {
    const response = this.empathyMapResponseRepository.create(createDto);
    return this.empathyMapResponseRepository.save(response);
  }

  findAllByProject(projectId: number): Promise<EmpathyMap[]> {
    return this.empathyMapRepository.find({
      where: { projectId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  findAllResponsesByProject(projectId: number): Promise<EmpathyMapResponse[]> {
    return this.empathyMapResponseRepository.find({
      where: { projectId },
      relations: ['user'],
      order: {
        type: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<EmpathyMap> {
    return this.empathyMapRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  findOneResponse(id: number): Promise<EmpathyMapResponse> {
    return this.empathyMapResponseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async upvoteResponse(id: number): Promise<EmpathyMapResponse> {
    const response = await this.findOneResponse(id);
    response.upvotes += 1;
    return this.empathyMapResponseRepository.save(response);
  }

  async downvoteResponse(id: number): Promise<EmpathyMapResponse> {
    const response = await this.findOneResponse(id);
    response.downvotes += 1;
    return this.empathyMapResponseRepository.save(response);
  }

  async toggleResponseSelection(id: number): Promise<EmpathyMapResponse> {
    const response = await this.findOneResponse(id);
    response.isSelected = !response.isSelected;
    return this.empathyMapResponseRepository.save(response);
  }

  async getSelectedResponsesByProject(
    projectId: number,
  ): Promise<EmpathyMapResponse[]> {
    return this.empathyMapResponseRepository.find({
      where: { projectId, isSelected: true },
      relations: ['user'],
    });
  }

  async getResponsesByType(
    projectId: number,
    type: ResponseType,
  ): Promise<EmpathyMapResponse[]> {
    return this.empathyMapResponseRepository.find({
      where: { projectId, type },
      relations: ['user'],
      order: { createdAt: 'DESC' },
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

  async deleteResponse(id: number, userId: number): Promise<void> {
    const response = await this.empathyMapResponseRepository.findOne({
      where: { id },
    });

    if (!response) {
      throw new Error('Response not found');
    }

    if (response.userId !== userId) {
      throw new Error(
        'Unauthorized: Only the creator can delete this response',
      );
    }

    await this.empathyMapResponseRepository.remove(response);
  }
}
