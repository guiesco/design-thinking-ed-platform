import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundError } from 'rxjs';
import { MailService } from '../mail/mail.service';
import { ClassController } from '../class/class.controller';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) { }

  create(createUserDto: CreateUserDto) {
    createUserDto.classStudentId = +createUserDto.classStudent.id;
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(user: LoginUserDto) {
    const returnUser = await this.userRepository.find({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    if (!returnUser.length) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return returnUser;
  }

  inviteUsers(users: string[], classId: number) {
    users.forEach(mail => {
      this.mailService.sendMail(mail, classId)
    });
  }
}
