import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeationIdea } from './entities/ideation-idea.entity';
import { IdeationPoint } from './entities/ideation-point.entity';
import { CreateIdeationIdeaDto } from './dto/create-ideation-idea.dto';
import { CreateIdeationPointDto } from './dto/create-ideation-point.dto';
import { UpdateIdeationIdeaDto } from './dto/update-ideation-idea.dto';
import { UpdateIdeationPointDto } from './dto/update-ideation-point.dto';
import { UserVoteService } from '../user-vote/user-vote.service';
import { VoteableEntityType } from '../user-vote/enums/voteable-entity-type.enum';

@Injectable()
export class IdeationService {
  constructor(
    @InjectRepository(IdeationIdea)
    private ideaRepository: Repository<IdeationIdea>,
    @InjectRepository(IdeationPoint)
    private pointRepository: Repository<IdeationPoint>,
    private userVoteService: UserVoteService,
  ) {}

  // Ideas CRUD operations
  async createIdea(createDto: CreateIdeationIdeaDto): Promise<IdeationIdea> {
    const idea = this.ideaRepository.create(createDto);
    return this.ideaRepository.save(idea);
  }

  async findAllIdeasByProject(
    projectId: number,
    userId?: number,
  ): Promise<IdeationIdea[]> {
    const ideas = await this.ideaRepository.find({
      where: { projectId },
      relations: ['points'],
      order: {
        upvotes: 'DESC',
        createdAt: 'DESC',
      },
    });

    if (userId) {
      for (const idea of ideas) {
        idea.hasVoted = await this.userVoteService.hasVoted(
          userId,
          VoteableEntityType.IDEATION_IDEA,
          idea.id,
        );

        for (const point of idea.points) {
          point.hasVoted = await this.userVoteService.hasVoted(
            userId,
            VoteableEntityType.IDEATION_POINT,
            point.id,
          );
        }
      }
    }

    return ideas;
  }

  async findOneIdea(id: number): Promise<IdeationIdea> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['points'],
    });

    if (!idea) {
      throw new NotFoundException(`Idea with ID ${id} not found`);
    }

    return idea;
  }

  async updateIdea(
    id: number,
    userId: number,
    updateDto: UpdateIdeationIdeaDto,
  ): Promise<IdeationIdea> {
    const idea = await this.findOneIdea(id);

    if (idea.userId !== userId) {
      throw new ForbiddenException('You can only update your own ideas');
    }

    await this.ideaRepository.update(id, updateDto);
    return this.findOneIdea(id);
  }

  async deleteIdea(id: number, userId: number): Promise<void> {
    const idea = await this.findOneIdea(id);

    if (idea.userId !== userId) {
      throw new ForbiddenException('You can only delete your own ideas');
    }

    // Excluir votos relacionados aos pontos da ideia e à própria ideia
    await this.deleteAllRelatedVotes(idea);

    // A exclusão dos pontos ocorre automaticamente devido à configuração de cascata
    await this.ideaRepository.delete(id);
  }

  /**
   * Método auxiliar para excluir todos os votos relacionados a uma ideia e seus pontos
   */
  private async deleteAllRelatedVotes(idea: IdeationIdea): Promise<void> {
    // Excluir votos relacionados aos pontos da ideia
    for (const point of idea.points) {
      await this.userVoteService.deleteVotesByEntity(
        VoteableEntityType.IDEATION_POINT,
        point.id,
      );
    }

    // Excluir votos relacionados à ideia
    await this.userVoteService.deleteVotesByEntity(
      VoteableEntityType.IDEATION_IDEA,
      idea.id,
    );
  }

  async upvoteIdea(id: number, userId: number): Promise<IdeationIdea> {
    const idea = await this.findOneIdea(id);
    const hasVoted = await this.userVoteService.hasVoted(
      userId,
      VoteableEntityType.IDEATION_IDEA,
      id,
    );

    if (hasVoted) {
      await this.userVoteService.removeVote(
        userId,
        VoteableEntityType.IDEATION_IDEA,
        id,
      );
      idea.upvotes -= 1;
    } else {
      await this.userVoteService.createVote(
        userId,
        VoteableEntityType.IDEATION_IDEA,
        id,
      );
      idea.upvotes += 1;
    }

    await this.ideaRepository.update(id, { upvotes: idea.upvotes });

    idea.hasVoted = !hasVoted;
    return idea;
  }

  async toggleIdeaSelection(id: number, userId: number): Promise<IdeationIdea> {
    const idea = await this.findOneIdea(id);
    idea.isSelected = !idea.isSelected;

    if (userId) {
      const hasVoted = await this.userVoteService.hasVoted(
        userId,
        VoteableEntityType.IDEATION_IDEA,
        idea.id,
      );
      idea['hasVoted'] = hasVoted;
    }

    return this.ideaRepository.save(idea);
  }

  async getSelectedIdeasByProject(projectId: number): Promise<IdeationIdea[]> {
    return this.ideaRepository.find({
      where: { projectId, isSelected: true },
      relations: ['points', 'user'],
    });
  }

  // Points CRUD operations
  async createPoint(createDto: CreateIdeationPointDto): Promise<IdeationPoint> {
    const idea = await this.findOneIdea(createDto.ideaId);
    const point = this.pointRepository.create(createDto);
    return this.pointRepository.save(point);
  }

  async findOnePoint(id: number): Promise<IdeationPoint> {
    const point = await this.pointRepository.findOne({
      where: { id },
    });

    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found`);
    }

    return point;
  }

  async updatePoint(
    id: number,
    userId: number,
    updateDto: UpdateIdeationPointDto,
  ): Promise<IdeationPoint> {
    const point = await this.findOnePoint(id);

    if (point.userId !== userId) {
      throw new ForbiddenException('You can only update your own points');
    }

    await this.pointRepository.update(id, updateDto);
    return this.findOnePoint(id);
  }

  async deletePoint(id: number, userId: number): Promise<void> {
    const point = await this.findOnePoint(id);

    if (point.userId !== userId) {
      throw new ForbiddenException('You can only delete your own points');
    }

    await this.pointRepository.delete(id);
  }

  async upvotePoint(id: number, userId: number): Promise<IdeationPoint> {
    const point = await this.findOnePoint(id);
    const hasVoted = await this.userVoteService.hasVoted(
      userId,
      VoteableEntityType.IDEATION_POINT,
      id,
    );

    if (hasVoted) {
      await this.userVoteService.removeVote(
        userId,
        VoteableEntityType.IDEATION_POINT,
        id,
      );
      point.upvotes -= 1;
    } else {
      await this.userVoteService.createVote(
        userId,
        VoteableEntityType.IDEATION_POINT,
        id,
      );
      point.upvotes += 1;
    }

    await this.pointRepository.update(id, { upvotes: point.upvotes });

    point.hasVoted = !hasVoted;
    return point;
  }
}
