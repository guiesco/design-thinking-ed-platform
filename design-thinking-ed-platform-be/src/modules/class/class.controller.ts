import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ProjectSteps } from 'src/common/enum/project.enum';
import { UserService } from '../user/user.service';
import { FindClassDto } from './dto/find-class.dto';

@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    createClassDto.projectStep = ProjectSteps.EMPATHY;
    createClassDto.invitedStudents = [createClassDto.invitedStudents].flat();
    this.userService.inviteUsers(createClassDto.invitedStudents);
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }

  @Get('professor/:id')
  findByProfessor(@Param('id') id: string) {
    return this.classService.findByProfessor(+id);
  }

  @Post('find')
  find(@Body() findClassDto: FindClassDto) {
    const { limit, offset, ...query } = findClassDto;
    return this.classService.find(query as any, limit, offset);
  }
}
