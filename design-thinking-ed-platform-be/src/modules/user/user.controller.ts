import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserTypeEnum } from 'src/common/enum/user.enum';
import { ClassService } from '../class/class.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, readonly classService: ClassService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.userType = UserTypeEnum.STUDENT;
    this.classService.removeStudentMail(createUserDto)
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.userService.login(user);
  }
}
