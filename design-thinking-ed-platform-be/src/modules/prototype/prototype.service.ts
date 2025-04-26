import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prototype } from './entities/prototype.entity';
import { CreatePrototypeDto } from './dto/create-prototype.dto';
import { UpdatePrototypeDto } from './dto/update-prototype.dto';

@Injectable()
export class PrototypeService {
  constructor(
    @InjectRepository(Prototype)
    private readonly prototypeRepository: Repository<Prototype>,
  ) {}

  /**
   * Cria um novo protótipo
   */
  async create(createPrototypeDto: CreatePrototypeDto): Promise<Prototype> {
    // Verificar se já existe um protótipo para este projeto
    const existingPrototype = await this.prototypeRepository.findOne({
      where: { projectId: createPrototypeDto.projectId },
    });

    if (existingPrototype) {
      // Se existir, atualiza o existente
      return this.update(existingPrototype.id, createPrototypeDto);
    }

    // Se não existir, cria um novo
    const prototype = this.prototypeRepository.create(createPrototypeDto);
    return this.prototypeRepository.save(prototype);
  }

  /**
   * Obtém um protótipo pelo ID
   */
  async findById(id: number): Promise<Prototype> {
    const prototype = await this.prototypeRepository.findOne({ where: { id } });
    if (!prototype) {
      throw new NotFoundException(`Protótipo com ID ${id} não encontrado`);
    }
    return prototype;
  }

  /**
   * Obtém um protótipo pelo ID do projeto
   */
  async findByProjectId(projectId: number): Promise<Prototype> {
    const prototype = await this.prototypeRepository.findOne({
      where: { projectId },
    });
    if (!prototype) {
      return null;
    }
    return prototype;
  }

  /**
   * Atualiza um protótipo
   */
  async update(
    id: number,
    updatePrototypeDto: UpdatePrototypeDto,
  ): Promise<Prototype> {
    const prototype = await this.findById(id);

    // Atualizar apenas campos permitidos
    if (updatePrototypeDto.description !== undefined) {
      prototype.description = updatePrototypeDto.description;
    }

    return this.prototypeRepository.save(prototype);
  }

  /**
   * Remove um protótipo
   */
  async remove(id: number): Promise<void> {
    const prototype = await this.findById(id);
    await this.prototypeRepository.remove(prototype);
  }
}
