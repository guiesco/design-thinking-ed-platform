import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { extractRelations } from 'src/common/utils/extractRelations';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  create(createClassDto: CreateClassDto) {
    return this.classRepository.save(createClassDto);
  }

  findAll() {
    return this.classRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return this.classRepository.delete(id);
  }

  findByProfessor(id: number) {
    return this.classRepository.find({
      relations: ['professor'],
      loadRelationIds: true,
      where: {
        professor: { id },
      },
    });
  }

  find(
    query: FindOptionsWhere<ClassEntity> | FindOptionsWhere<ClassEntity>[],
    take: number,
    skip: number,
  ) {
    const relations = extractRelations(query);

    return this.classRepository.find({
      relations,
      loadRelationIds: true,
      where: query,
      take: take,
      skip: skip,
    });
  }
}
