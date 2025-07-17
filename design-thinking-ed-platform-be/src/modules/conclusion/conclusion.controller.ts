import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ConclusionService } from './conclusion.service';
import { CreateConclusionDto } from './dto/create-conclusion.dto';
import { UpdateConclusionDto } from './dto/update-conclusion.dto';

@Controller('conclusion')
export class ConclusionController {
  constructor(private readonly conclusionService: ConclusionService) {}

  @Post()
  async create(@Body() createConclusionDto: CreateConclusionDto) {
    return this.conclusionService.create(createConclusionDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conclusionService.findById(id);
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    const conclusion = await this.conclusionService.findByProjectId(projectId);
    if (!conclusion) {
      throw new NotFoundException(
        `Conclusão para o projeto ${projectId} não encontrada`,
      );
    }
    return conclusion;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConclusionDto: UpdateConclusionDto,
  ) {
    return this.conclusionService.update(id, updateConclusionDto);
  }

  @Post(':id/finalize')
  async finalize(@Param('id', ParseIntPipe) id: number) {
    return this.conclusionService.finalize(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.conclusionService.remove(id);
    return { message: 'Conclusão removida com sucesso' };
  }
}
