import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ProblemDefinitionResponse,
  ProblemDefinitionType,
} from './entities/problem-definition-response.entity';
import { CreateProblemDefinitionResponseDto } from './dto/create-problem-definition-response.dto';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteableEntityType } from '../user-vote/enums/voteable-entity-type.enum';
import { ProblemDefinition } from './entities/problem-definition.entity';
import { CreateProblemDefinitionDto } from './dto/create-problem-definition.dto';
import { UpdateProblemDefinitionDto } from './dto/update-problem-definition.dto';

@Injectable()
export class ProblemDefinitionService {
  constructor(
    @InjectRepository(ProblemDefinitionResponse)
    private readonly problemDefinitionResponseRepository: Repository<ProblemDefinitionResponse>,
    private userVoteService: UserVoteService,
    @InjectRepository(ProblemDefinition)
    private repository: Repository<ProblemDefinition>,
  ) {}

  createResponse(
    createDto: CreateProblemDefinitionResponseDto,
  ): Promise<ProblemDefinitionResponse> {
    const response = this.problemDefinitionResponseRepository.create(createDto);
    return this.problemDefinitionResponseRepository.save(response);
  }

  async createResponses(responses: CreateProblemDefinitionResponseDto[]) {
    const createdResponses =
      this.problemDefinitionResponseRepository.create(responses);
    return await this.problemDefinitionResponseRepository.save(
      createdResponses,
    );
  }

  async findAllResponsesByProject(
    projectId: number,
    userId?: number,
  ): Promise<ProblemDefinitionResponse[]> {
    const responses = await this.problemDefinitionResponseRepository.find({
      where: { projectId },
      relations: ['user'],
    });

    // Para cada resposta, verifica se o usuário já votou
    for (const response of responses) {
      response.upvotes = await this.userVoteService.getVoteCount(
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        response.id,
      );

      // Se um userId foi fornecido, verifica se o usuário já votou
      if (userId) {
        const hasVoted = await this.userVoteService.hasVoted(
          userId,
          VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
          response.id,
        );
        response['hasVoted'] = hasVoted;
      }
    }

    // Ordena as respostas por número de upvotes (do maior para o menor)
    responses.sort((a, b) => b.upvotes - a.upvotes);

    return responses;
  }

  findOneResponse(id: number): Promise<ProblemDefinitionResponse> {
    return this.problemDefinitionResponseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async upvoteResponse(
    id: number,
    userId: number,
  ): Promise<ProblemDefinitionResponse> {
    const response = await this.findOneResponse(id);

    // Registra o voto do usuário
    await this.userVoteService.createVote(
      userId,
      VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      id,
    );

    // Atualiza o contador de upvotes
    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      id,
    );

    const problemResponse = await this.problemDefinitionResponseRepository.save(
      response,
    );

    return { ...problemResponse, hasVoted: true };
  }

  async removeUpvoteResponse(
    id: number,
    userId: number,
  ): Promise<ProblemDefinitionResponse> {
    const response = await this.findOneResponse(id);
    await this.userVoteService.removeVote(
      userId,
      VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      id,
    );

    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      id,
    );

    const problemResponse = await this.problemDefinitionResponseRepository.save(
      response,
    );

    return { ...problemResponse, hasVoted: false };
  }

  async toggleResponseSelection(
    id: number,
    userId: number,
  ): Promise<ProblemDefinitionResponse> {
    const response = await this.findOneResponse(id);
    response.isSelected = !response.isSelected;
    if (userId) {
      const hasVoted = await this.userVoteService.hasVoted(
        userId,
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
        response.id,
      );
      response['hasVoted'] = hasVoted;
    }
    return this.problemDefinitionResponseRepository.save(response);
  }

  async getSelectedResponsesByProject(
    projectId: number,
  ): Promise<ProblemDefinitionResponse[]> {
    return this.problemDefinitionResponseRepository.find({
      where: { projectId, isSelected: true },
      relations: ['user'],
    });
  }

  async getResponsesByType(
    projectId: number,
    type: ProblemDefinitionType,
  ): Promise<ProblemDefinitionResponse[]> {
    return this.problemDefinitionResponseRepository.find({
      where: { projectId, type },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async deleteResponse(id: number, userId: number): Promise<void> {
    const response = await this.findOneResponse(id);
    if (response && response.userId !== userId) {
      throw new HttpException(
        'You are not allowed to delete this response',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.problemDefinitionResponseRepository.remove(response);
  }

  async updateResponse(
    id: number,
    userId: number,
    content: string,
  ): Promise<ProblemDefinitionResponse> {
    const response = await this.findOneResponse(id);
    if (response && response.userId !== userId) {
      throw new HttpException(
        'You are not allowed to update this response',
        HttpStatus.FORBIDDEN,
      );
    }
    response.content = content;
    const hasVoted = await this.userVoteService.hasVoted(
      userId,
      VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      response.id,
    );
    response['hasVoted'] = hasVoted;
    return this.problemDefinitionResponseRepository.save(response);
  }

  async create(dto: CreateProblemDefinitionDto): Promise<ProblemDefinition> {
    const problemDefinition = this.repository.create(dto);
    return this.repository.save(problemDefinition);
  }

  async findOne(id: number): Promise<ProblemDefinition> {
    return this.repository.findOne({ where: { id } });
  }

  async findByProject(projectId: number): Promise<ProblemDefinition[]> {
    return this.repository.find({ where: { projectId } });
  }

  async update(
    id: number,
    dto: UpdateProblemDefinitionDto,
  ): Promise<ProblemDefinition> {
    await this.repository.update(id, dto);
    return this.findOne(id);
  }
}
