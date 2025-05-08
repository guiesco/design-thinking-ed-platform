import { Controller, Get, Param, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ProjectMetricsResponseDto } from './dto/student-metrics.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('project/:id')
  getProjectMetrics(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<ProjectMetricsResponseDto> {
    // Verificar se o usuário é um professor aqui (implementação futura)
    return this.metricsService.getProjectMetrics(+id);
  }
}
