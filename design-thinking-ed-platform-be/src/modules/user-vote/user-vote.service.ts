import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserVote } from './entities/user-vote.entity';
import { VoteType, VoteableEntityType } from './enums/vote.enum';

@Injectable()
export class UserVoteService {
  constructor(
    @InjectRepository(UserVote)
    private userVoteRepository: Repository<UserVote>,
  ) {}

  async vote(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
    voteType: VoteType,
  ): Promise<UserVote> {
    // Verifica se o usuário já votou nesta entidade
    const existingVote = await this.userVoteRepository.findOne({
      where: {
        userId,
        entityType,
        entityId,
      },
    });

    if (existingVote) {
      throw new ConflictException('Usuário já votou nesta entidade');
    }

    const vote = this.userVoteRepository.create({
      userId,
      entityType,
      entityId,
      voteType,
    });

    return this.userVoteRepository.save(vote);
  }

  async hasVoted(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<boolean> {
    const vote = await this.userVoteRepository.findOne({
      where: {
        userId,
        entityType,
        entityId,
      },
    });

    return !!vote;
  }

  async getVoteCount(
    entityType: VoteableEntityType,
    entityId: number,
    voteType: VoteType,
  ): Promise<number> {
    return this.userVoteRepository.count({
      where: {
        entityType,
        entityId,
        voteType,
      },
    });
  }

  async removeVote(
    userId: number,
    entityType: VoteableEntityType,
    entityId: number,
  ): Promise<void> {
    await this.userVoteRepository.delete({
      userId,
      entityType,
      entityId,
    });
  }
}
