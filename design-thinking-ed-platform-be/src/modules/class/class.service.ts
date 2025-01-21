import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';

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
    return `This action removes a #${id} class`;
  }

  findByProfessor(id: number) {
    return this.classRepository.find({
      relations: ['user'],
      loadRelationIds: true,
      where: {
        professor: { id },
      },
    });
  }

  async removeStudentMail(user: CreateUserDto) {
    const classToEdit = await this.findOne(user.classStudent.id);
    classToEdit.invitedStudents = classToEdit.invitedStudents.filter(studentMail => user.email !== studentMail)
    this.update(classToEdit.id, classToEdit)
  }
}
