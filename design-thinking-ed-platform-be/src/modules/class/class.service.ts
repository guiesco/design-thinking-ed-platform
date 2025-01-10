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
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
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

  findByStudentMail(mail: string) {
    return this.classRepository.findOne({
      where: {
        invitedStudents: `${mail}`
      }
    })
  }

  async addStudent(mail: string, user: CreateUserDto) {
    const classToEdit = this.findByStudentMail(mail);
    user.class = await classToEdit
    for (let i = 0; i < (await classToEdit).invitedStudents.length; i++) {
      const studentEmail = (await classToEdit).invitedStudents[i];
      if (studentEmail === mail) {
        (await classToEdit).invitedStudents.slice(i, 1);
        (await classToEdit).students.push()
      }

    }

  }
}
