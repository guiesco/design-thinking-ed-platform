import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeDefinitionResponse } from './entities/challenge-definition-response.entity';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteableEntityType } from '../user-vote/enums/voteable-entity-type.enum';
import { CreateChallengeDefinitionResponseDto } from './dto/create-challenge-definition-response.dto';

@Injectable()
export class ChallengeDefinitionService {
  constructor(
    @InjectRepository(ChallengeDefinitionResponse)
    private challengeDefinitionResponseRepository: Repository<ChallengeDefinitionResponse>,
    private userVoteService: UserVoteService,
  ) {}

  async findAllResponsesByProject(
    projectId: number,
    userId?: number,
  ): Promise<ChallengeDefinitionResponse[]> {
    const responses = await this.challengeDefinitionResponseRepository.find({
      where: { project: { id: projectId } },
      relations: ['user'],
    });

    // Para cada resposta, verifica se o usuário já votou
    for (const response of responses) {
      response['upvotes'] = await this.userVoteService.getVoteCount(
        VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
        response.id,
      );

      // Se um userId foi fornecido, verifica se o usuário já votou
      if (userId) {
        const hasVoted = await this.userVoteService.hasVoted(
          userId,
          VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
          response.id,
        );
        response['hasVoted'] = hasVoted;
      }
    }

    // Ordena as respostas por número de upvotes (do maior para o menor)
    responses.sort((a, b) => b['upvotes'] - a['upvotes']);

    return responses;
  }

  async createResponse(
    createResponseDto: CreateChallengeDefinitionResponseDto,
  ): Promise<ChallengeDefinitionResponse> {
    const response = this.challengeDefinitionResponseRepository.create({
      type: createResponseDto.type,
      content: createResponseDto.content,
      user: { id: createResponseDto.userId },
      project: { id: createResponseDto.projectId },
    });

    return this.challengeDefinitionResponseRepository.save(response);
  }

  async updateResponse(
    responseId: number,
    userId: number,
    content: string,
  ): Promise<ChallengeDefinitionResponse> {
    const response = await this.challengeDefinitionResponseRepository.findOne({
      where: { id: responseId },
      relations: ['user'],
    });

    if (!response) {
      throw new Error('Response not found');
    }

    if (response.user.id !== userId) {
      throw new Error(
        'Unauthorized: Only the creator can update this response',
      );
    }

    response.content = content;
    return this.challengeDefinitionResponseRepository.save(response);
  }

  async deleteResponse(responseId: number): Promise<void> {
    const result = await this.challengeDefinitionResponseRepository.delete(
      responseId,
    );

    if (result.affected === 0) {
      throw new NotFoundException('Resposta não encontrada');
    }
  }

  async upvoteResponse(
    responseId: number,
    userId: number,
  ): Promise<ChallengeDefinitionResponse> {
    const response = await this.challengeDefinitionResponseRepository.findOne({
      where: { id: responseId },
      relations: ['user'],
    });

    // Registra o voto do usuário
    await this.userVoteService.createVote(
      userId,
      VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
      responseId,
    );

    // Atualiza o contador de upvotes
    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
      responseId,
    );

    const empathyResponse =
      await this.challengeDefinitionResponseRepository.save(response);

    return { ...empathyResponse, hasVoted: true };
  }

  async removeVote(
    responseId: number,
    userId: number,
  ): Promise<ChallengeDefinitionResponse> {
    const response = await this.challengeDefinitionResponseRepository.findOne({
      where: { id: responseId },
      relations: ['user'],
    });

    await this.userVoteService.removeVote(
      userId,
      VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
      responseId,
    );

    response.upvotes = await this.userVoteService.getVoteCount(
      VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
      responseId,
    );

    const challengeDefinitionResponse =
      await this.challengeDefinitionResponseRepository.save(response);

    return { ...challengeDefinitionResponse, hasVoted: false };
  }

  async toggleResponseSelection(responseId: number): Promise<void> {
    const response = await this.challengeDefinitionResponseRepository.findOne({
      where: { id: responseId },
      relations: ['user'],
    });

    if (!response) {
      throw new NotFoundException('Resposta não encontrada');
    }

    response.isSelected = !response.isSelected;
    await this.challengeDefinitionResponseRepository.save(response);
  }
}
