import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { extractRelations } from 'src/common/utils/extractRelations';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) { }

  create(createClassDto: CreateClassDto) {
    return this.classRepository.save(createClassDto);
  }

  findAll() {
    return this.classRepository.find();
  }

  findOne(id: number) {
    return this.classRepository.findOne({ where: { id } });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepository.update(id, updateClassDto)
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

  async removeStudentMail(user: CreateUserDto) {
    const classToEdit = await this.findOne(user.studentClass.id);
    classToEdit.invitedStudents = classToEdit.invitedStudents.filter(studentMail => user.email !== studentMail)
    this.update(classToEdit.id, classToEdit)
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
