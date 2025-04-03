import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserVote } from './entities/user-vote.entity';
import { VoteableEntityType } from './enums/voteable-entity-type.enum';

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
}
