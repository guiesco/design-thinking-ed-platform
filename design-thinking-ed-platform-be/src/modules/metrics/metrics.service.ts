import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectEntity } from '../project/entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserVoteService } from '../user-vote/user-vote.service';
import { EmpathyMapResponse } from '../empathy-map/entities/empathy-map-response.entity';
import { ProblemDefinitionResponse } from '../problem-definition/entities/problem-definition-response.entity';
import { ChallengeDefinitionResponse } from '../challenge-definition/entities/challenge-definition-response.entity';
import { IdeationIdea } from '../ideation/entities/ideation-idea.entity';
import { IdeationPoint } from '../ideation/entities/ideation-point.entity';
import {
  ProjectMetricsResponseDto,
  StudentMetricsDto,
} from './dto/student-metrics.dto';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmpathyMapResponse)
    private readonly empathyMapResponseRepository: Repository<EmpathyMapResponse>,
    @InjectRepository(ProblemDefinitionResponse)
    private readonly problemDefinitionResponseRepository: Repository<ProblemDefinitionResponse>,
    @InjectRepository(ChallengeDefinitionResponse)
    private readonly challengeDefinitionResponseRepository: Repository<ChallengeDefinitionResponse>,
    @InjectRepository(IdeationIdea)
    private readonly ideationIdeaRepository: Repository<IdeationIdea>,
    @InjectRepository(IdeationPoint)
    private readonly ideationPointRepository: Repository<IdeationPoint>,
    private readonly userVoteService: UserVoteService,
  ) {}

  async getProjectMetrics(
    projectId: number,
  ): Promise<ProjectMetricsResponseDto> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['group', 'group.students'],
    });
    console.log('🚀 ~ MetricsService ~ project:', project);

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    const studentsMetrics: StudentMetricsDto[] = [];

    for (const student of project.group.students) {
      console.log('🚀 ~ MetricsService ~ student:', student);
      // Contar likes dados pelo aluno (votos)
      const givenLikes = await this.userVoteService.countVotesByUser(
        student.id,
      );

      // Contar respostas criadas pelo aluno
      const createdResponses = await this.countUserResponses(
        student.id,
        projectId,
      );

      // Contar respostas selecionadas do aluno
      const selectedResponses = await this.countSelectedUserResponses(
        student.id,
        projectId,
      );

      // Total de interações (soma de likes dados e respostas criadas)
      const totalInteractions = givenLikes + createdResponses;

      studentsMetrics.push({
        userId: student.id,
        name: student.name,
        totalInteractions,
        givenLikes,
        createdResponses,
        selectedResponses,
      });
    }

    return { students: studentsMetrics };
  }

  private async countUserResponses(
    userId: number,
    projectId: number,
  ): Promise<number> {
    // Contar respostas usando os repositórios diretamente
    const empathyMapCount = await this.empathyMapResponseRepository.count({
      where: {
        userId,
        projectId,
      },
    });

    const problemDefinitionCount =
      await this.problemDefinitionResponseRepository.count({
        where: {
          userId,
          projectId,
        },
      });

    const challengeDefinitionCount =
      await this.challengeDefinitionResponseRepository.count({
        where: {
          userId,
          projectId,
        },
      });

    const ideationIdeaCount = await this.ideationIdeaRepository.count({
      where: {
        userId,
        projectId,
      },
    });

    // Para IdeationPoint, precisamos primeiro encontrar todas as ideias do projeto
    const projectIdeas = await this.ideationIdeaRepository.find({
      where: {
        projectId,
      },
      select: ['id'],
    });

    const ideaIds = projectIdeas.map((idea) => idea.id);

    // Agora podemos contar os pontos criados pelo usuário para essas ideias
    let ideationPointCount = 0;
    if (ideaIds.length > 0) {
      ideationPointCount = await this.ideationPointRepository.count({
        where: {
          userId,
          ideaId: In(ideaIds),
        },
      });
    }

    return (
      empathyMapCount +
      problemDefinitionCount +
      challengeDefinitionCount +
      ideationIdeaCount +
      ideationPointCount
    );
  }

  private async countSelectedUserResponses(
    userId: number,
    projectId: number,
  ): Promise<number> {
    // Conta respostas que têm isSelected = true
    const empathyMapCount = await this.empathyMapResponseRepository.count({
      where: {
        userId,
        projectId,
        isSelected: true,
      },
    });

    const problemDefinitionCount =
      await this.problemDefinitionResponseRepository.count({
        where: {
          userId,
          projectId,
          isSelected: true,
        },
      });

    const challengeDefinitionCount =
      await this.challengeDefinitionResponseRepository.count({
        where: {
          userId,
          projectId,
          isSelected: true,
        },
      });

    return empathyMapCount + problemDefinitionCount + challengeDefinitionCount;
  }
}
