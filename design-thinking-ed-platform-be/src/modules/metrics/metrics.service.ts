import { Injectable, NotFoundException } from '@nestjs/common';
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
  DesignThinkingStage,
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
    stage: DesignThinkingStage = DesignThinkingStage.ALL,
  ): Promise<ProjectMetricsResponseDto> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['group', 'group.students'],
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const studentsMetrics: StudentMetricsDto[] = [];

    for (const student of project.group.students) {
      // Contar likes dados pelo aluno (votos)
      const givenLikes = await this.userVoteService.countVotesByUser(
        student.id,
        stage,
      );

      // Contar respostas criadas pelo aluno
      const createdResponses = await this.countUserResponses(
        student.id,
        projectId,
        stage,
      );

      // Contar respostas selecionadas do aluno
      const selectedResponses = await this.countSelectedUserResponses(
        student.id,
        projectId,
        stage,
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
    stage: DesignThinkingStage = DesignThinkingStage.ALL,
  ): Promise<number> {
    let empathyMapCount = 0;
    let problemDefinitionCount = 0;
    let challengeDefinitionCount = 0;
    let ideationIdeaCount = 0;
    let ideationPointCount = 0;

    // Se a etapa é ALL ou EMPATHY, conta as respostas do mapa de empatia
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.EMPATHY
    ) {
      empathyMapCount = await this.empathyMapResponseRepository.count({
        where: {
          userId,
          projectId,
        },
      });
    }

    // Se a etapa é ALL ou PROBLEM_DEFINITION, conta as respostas de definição de problema
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.PROBLEM_DEFINITION
    ) {
      problemDefinitionCount =
        await this.problemDefinitionResponseRepository.count({
          where: {
            userId,
            projectId,
          },
        });
    }

    // Se a etapa é ALL ou CHALLENGE_DEFINITION, conta as respostas de definição de desafio
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.CHALLENGE_DEFINITION
    ) {
      challengeDefinitionCount =
        await this.challengeDefinitionResponseRepository.count({
          where: {
            userId,
            projectId,
          },
        });
    }

    // Se a etapa é ALL ou IDEATION, conta as ideias e pontos
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.IDEATION
    ) {
      ideationIdeaCount = await this.ideationIdeaRepository.count({
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
      if (ideaIds.length > 0) {
        ideationPointCount = await this.ideationPointRepository.count({
          where: {
            userId,
            ideaId: In(ideaIds),
          },
        });
      }
    }

    // Nota: As etapas PROTOTYPING e CONCLUSION não têm respostas contáveis
    // do mesmo modo que as outras etapas

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
    stage: DesignThinkingStage = DesignThinkingStage.ALL,
  ): Promise<number> {
    let empathyMapCount = 0;
    let problemDefinitionCount = 0;
    let challengeDefinitionCount = 0;

    // Se a etapa é ALL ou EMPATHY, conta as respostas selecionadas do mapa de empatia
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.EMPATHY
    ) {
      empathyMapCount = await this.empathyMapResponseRepository.count({
        where: {
          userId,
          projectId,
          isSelected: true,
        },
      });
    }

    // Se a etapa é ALL ou PROBLEM_DEFINITION, conta as respostas selecionadas de definição de problema
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.PROBLEM_DEFINITION
    ) {
      problemDefinitionCount =
        await this.problemDefinitionResponseRepository.count({
          where: {
            userId,
            projectId,
            isSelected: true,
          },
        });
    }

    // Se a etapa é ALL ou CHALLENGE_DEFINITION, conta as respostas selecionadas de definição de desafio
    if (
      stage === DesignThinkingStage.ALL ||
      stage === DesignThinkingStage.CHALLENGE_DEFINITION
    ) {
      challengeDefinitionCount =
        await this.challengeDefinitionResponseRepository.count({
          where: {
            userId,
            projectId,
            isSelected: true,
          },
        });
    }

    return empathyMapCount + problemDefinitionCount + challengeDefinitionCount;
  }
}
