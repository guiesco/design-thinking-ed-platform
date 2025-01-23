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
import { FindGroupDto } from './dto/find-class.dto';

@Controller('Group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createDto: CreateGroupDto) {
    return this.groupService.create(createDto);
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

  @Post('find')
  find(@Body() findGroupDto: FindGroupDto) {
    const { take, skip, ...query } = findGroupDto;
    return this.groupService.find(query as any, take, skip);
  }
}
