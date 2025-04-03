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
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteableEntityType } from '../user-vote/enums/voteable-entity-type.enum';

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
    });

    // Para cada resposta, verifica se o usuário já votou
    for (const response of responses) {
      response.upvotes = await this.userVoteService.getVoteCount(
        VoteableEntityType.EMPATHY_MAP_RESPONSE,
        response.id,
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

    // Ordena as respostas por número de upvotes (do maior para o menor)
    responses.sort((a, b) => b.upvotes - a.upvotes);

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
    await this.userVoteService.createVote(
      userId,
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
    );

    // Atualiza o contador de upvotes
    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
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
    const response = await this.findOneResponse(id);
    await this.userVoteService.removeVote(
      userId,
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
    );

    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.EMPATHY_MAP_RESPONSE,
      id,
    );

    const empathyResponse = await this.empathyMapResponseRepository.save(
      response,
    );

    return { ...empathyResponse, hasVoted: false };
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
    await this.userVoteService.createVote(
      userId,
      VoteableEntityType.EMPATHY_MAP,
      id,
    );

    // Atualiza o contador de upvotes
    empathyMap.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.EMPATHY_MAP,
      id,
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

  async updateResponse(
    id: number,
    userId: number,
    content: string,
  ): Promise<EmpathyMapResponse> {
    const response = await this.empathyMapResponseRepository.findOne({
      where: { id },
    });

    if (!response) {
      throw new Error('Response not found');
    }

    if (response.userId !== userId) {
      throw new Error(
        'Unauthorized: Only the creator can update this response',
      );
    }

    response.content = content;
    return this.empathyMapResponseRepository.save(response);
  }
}
