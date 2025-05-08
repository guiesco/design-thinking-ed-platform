import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserVote } from './entities/user-vote.entity';
import { VoteableEntityType } from './enums/voteable-entity-type.enum';
import { DesignThinkingStage } from '../metrics/dto/student-metrics.dto';
import { In } from 'typeorm';

@Injectable()
export class UserVoteService {
  constructor(
    @InjectRepository(UserVote)
    private userVoteRepository: Repository<UserVote>,
  ) {}

  async createVote(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<UserVote> {
    const vote = this.userVoteRepository.create({
      user: { id: userId },
      entityType,
      entityId,
    });

    return this.userVoteRepository.save(vote);
  }

  async removeVote(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<void> {
    await this.userVoteRepository.delete({
      user: { id: userId },
      entityType,
      entityId,
    });
  }

  async hasVoted(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<boolean> {
    const vote = await this.userVoteRepository.findOne({
      where: {
        user: { id: userId },
        entityType,
        entityId,
      },
    });

    return !!vote;
  }

  async getVoteCount(
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<number> {
    return this.userVoteRepository.count({
      where: {
        entityType,
        entityId,
      },
    });
  }

  async deleteVotesByEntity(
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<void> {
    await this.userVoteRepository.delete({
      entityType,
      entityId,
    });
  }

  async countVotesByUser(
    userId: number,
    stage: DesignThinkingStage = DesignThinkingStage.ALL,
  ): Promise<number> {
    // Se a etapa for ALL, retorna todos os votos
    if (stage === DesignThinkingStage.ALL) {
      return this.userVoteRepository.count({
        where: {
          user: { id: userId },
        },
      });
    }

    // Mapeamento de etapas para tipos de entidades votáveis
    const entityTypesByStage = {
      [DesignThinkingStage.EMPATHY]: [
        VoteableEntityType.EMPATHY_MAP,
        VoteableEntityType.EMPATHY_MAP_RESPONSE,
      ],
      [DesignThinkingStage.PROBLEM_DEFINITION]: [
        VoteableEntityType.PROBLEM_DEFINITION_RESPONSE,
      ],
      [DesignThinkingStage.CHALLENGE_DEFINITION]: [
        VoteableEntityType.CHALLENGE_DEFINITION_RESPONSE,
      ],
      [DesignThinkingStage.IDEATION]: [
        VoteableEntityType.IDEATION_IDEA,
        VoteableEntityType.IDEATION_POINT,
      ],
      [DesignThinkingStage.PROTOTYPING]: [],
      [DesignThinkingStage.CONCLUSION]: [],
    };

    // Obtém os tipos de entidades para a etapa selecionada
    const entityTypes = entityTypesByStage[stage] || [];

    // Se não houver tipos de entidades para esta etapa, retorna 0
    if (entityTypes.length === 0) {
      return 0;
    }

    // Conta os votos para os tipos de entidades da etapa
    return this.userVoteRepository.count({
      where: {
        user: { id: userId },
        entityType: In(entityTypes),
      },
    });
  }
}
