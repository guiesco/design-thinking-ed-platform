import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { EmpathyMapService } from './empathy-map.service';
import { CreateEmpathyMapDto } from './dto/create-empathy-map.dto';

@Controller('empathy-map')
export class EmpathyMapController {
  constructor(private readonly empathyMapService: EmpathyMapService) {}

  @Post()
  create(@Body() createDto: CreateEmpathyMapDto) {
    return this.empathyMapService.create(createDto);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.empathyMapService.findAllByProject(+projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empathyMapService.findOne(+id);
  }

  @Put(':id/upvote')
  upvote(@Param('id') id: string) {
    return this.empathyMapService.upvote(+id);
  }

  @Put(':id/downvote')
  downvote(@Param('id') id: string) {
    return this.empathyMapService.downvote(+id);
  }

  @Put(':id/toggle-selection')
  toggleSelection(@Param('id') id: string) {
    return this.empathyMapService.toggleSelection(+id);
  }

  @Get('project/:projectId/selected')
  getSelectedByProject(@Param('projectId') projectId: string) {
    return this.empathyMapService.getSelectedByProject(+projectId);
  }
}
