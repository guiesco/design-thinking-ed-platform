import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ClassEntity } from '../class/entities/class.entity';
import { UserService } from '../user/user.service';

@Controller('Group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    createGroupDto.className = ClassEntity.name;
    createGroupDto.students = [createGroupDto.students].flat();
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
