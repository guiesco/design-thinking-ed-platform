import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conclusion } from './entities/conclusion.entity';
import { CreateConclusionDto } from './dto/create-conclusion.dto';
import { UpdateConclusionDto } from './dto/update-conclusion.dto';

@Injectable()
export class ConclusionService {
  constructor(
    @InjectRepository(Conclusion)
    private readonly conclusionRepository: Repository<Conclusion>,
  ) {}

  /**
   * Cria uma nova conclusão
   */
  async create(createConclusionDto: CreateConclusionDto): Promise<Conclusion> {
    // Verificar se já existe uma conclusão para este projeto
    const existingConclusion = await this.conclusionRepository.findOne({
      where: { projectId: createConclusionDto.projectId },
    });

    if (existingConclusion) {
      // Se existir, atualiza a existente
      return this.update(existingConclusion.id, createConclusionDto);
    }

    // Se não existir, cria uma nova
    const conclusion = this.conclusionRepository.create(createConclusionDto);
    return this.conclusionRepository.save(conclusion);
  }

  /**
   * Obtém uma conclusão pelo ID
   */
  async findById(id: number): Promise<Conclusion> {
    const conclusion = await this.conclusionRepository.findOne({
      where: { id },
    });
    if (!conclusion) {
      throw new NotFoundException(`Conclusão com ID ${id} não encontrada`);
    }
    return conclusion;
  }

  /**
   * Obtém uma conclusão pelo ID do projeto
   */
  async findByProjectId(projectId: number): Promise<Conclusion> {
    const conclusion = await this.conclusionRepository.findOne({
      where: { projectId },
    });
    if (!conclusion) {
      return null;
    }
    return conclusion;
  }

  /**
   * Atualiza uma conclusão
   */
  async update(
    id: number,
    updateConclusionDto: UpdateConclusionDto,
  ): Promise<Conclusion> {
    const conclusion = await this.findById(id);

    // Atualizar apenas campos permitidos
    if (updateConclusionDto.description !== undefined) {
      conclusion.description = updateConclusionDto.description;
    }
    if (updateConclusionDto.isFinalized !== undefined) {
      conclusion.isFinalized = updateConclusionDto.isFinalized;
    }

    return this.conclusionRepository.save(conclusion);
  }

  /**
   * Finaliza a etapa de conclusão
   */
  async finalize(id: number): Promise<Conclusion> {
    const conclusion = await this.findById(id);
    conclusion.isFinalized = true;
    return this.conclusionRepository.save(conclusion);
  }

  /**
   * Remove uma conclusão
   */
  async remove(id: number): Promise<void> {
    const conclusion = await this.findById(id);
    await this.conclusionRepository.remove(conclusion);
  }
}
