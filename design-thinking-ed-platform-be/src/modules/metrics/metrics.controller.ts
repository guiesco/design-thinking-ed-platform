import {
  Controller,
  Get,
  Param,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import {
  DesignThinkingStage,
  MetricsQueryDto,
  ProjectMetricsResponseDto,
} from './dto/student-metrics.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get('project/:id')
  async getProjectMetrics(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('stage') stage: DesignThinkingStage = DesignThinkingStage.ALL,
  ): Promise<ProjectMetricsResponseDto> {
    // Verificar se o usuário é um professor
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.userType !== 'professor') {
      throw new ForbiddenException('Apenas professores têm acesso às métricas');
    }

    // Chamar o serviço com o filtro de etapa
    return this.metricsService.getProjectMetrics(+id, stage);
  }
}
