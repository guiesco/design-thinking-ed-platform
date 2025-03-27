import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpathyMap } from './entities/empathy-map.entity';
import { CreateEmpathyMapDto } from './dto/create-empathy-map.dto';
import {
  EmpathyMapResponse,
  ResponseType,
} from './entities/empathy-map-response.entity';
import { CreateEmpathyMapResponseDto } from './dto/create-empathy-map-response.dto';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteType, VoteableEntityType } from '../user-vote/enums/vote.enum';
import { UserVote } from '../user-vote/entities/user-vote.entity';

@Injectable()
export class EmpathyMapService {
  constructor(
    @InjectRepository(EmpathyMap)
    private readonly empathyMapRepository: Repository<EmpathyMap>,
    @InjectRepository(EmpathyMapResponse)
    private readonly empathyMapResponseRepository: Repository<EmpathyMapResponse>,
    private userVoteService: UserVoteService,
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

  async findAllResponsesByProject(
    projectId: number,
    userId?: number,
  ): Promise<EmpathyMapResponse[]> {
    const responses = await this.empathyMapResponseRepository.find({
      where: { projectId },
      relations: ['user'],
      order: {
        type: 'ASC',
        createdAt: 'DESC',
      },
    });

    // Para cada resposta, verifica se o usuário já votou
    for (const response of responses) {
      response.upvotes = await this.userVoteService.getVoteCount(
        VoteableEntityType.EMPATHY_MAP_RESPONSE,
        response.id,
        VoteType.UPVOTE,
      );

      // Se um userId foi fornecido, verifica se o usuário já votou
      if (userId) {
        const hasVoted = await this.userVoteService.hasVoted(
          userId,
          VoteableEntityType.EMPATHY_MAP_RESPONSE,
          response.id,
        );
        response['hasVoted'] = hasVoted;
      }
    }

    return responses;
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

  async upvoteResponse(
    id: number,
    userId: number,
  ): Promise<EmpathyMapResponse> {
    const response = await this.findOneResponse(id);

    // Registra o voto do usuário
    await this.userVoteService.vote(
      userId,
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
      VoteType.UPVOTE,
    );

    // Atualiza o contador de upvotes
    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
      VoteType.UPVOTE,
    );

    const empathyResponse = await this.empathyMapResponseRepository.save(
      response,
    );

    return { ...empathyResponse, hasVoted: true };
  }

  async removeUpvoteResponse(
    id: number,
    userId: number,
  ): Promise<EmpathyMapResponse> {
    await this.userVoteService.removeVote(
      userId,
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
    );

    return this.findOneResponse(id);
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

  async upvote(id: number, userId: number): Promise<EmpathyMap> {
    const empathyMap = await this.findOne(id);

    // Registra o voto do usuário
    await this.userVoteService.vote(
      userId,
      VoteableEntityType.EMPATHY_MAP,
      id,
      VoteType.UPVOTE,
    );

    // Atualiza o contador de upvotes
    empathyMap.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.EMPATHY_MAP,
      id,
      VoteType.UPVOTE,
    );

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
