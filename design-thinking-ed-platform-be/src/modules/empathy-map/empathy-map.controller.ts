import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EmpathyMapService } from './empathy-map.service';
import { CreateEmpathyMapDto } from './dto/create-empathy-map.dto';
import { CreateEmpathyMapResponseDto } from './dto/create-empathy-map-response.dto';
import { ResponseType } from './entities/empathy-map-response.entity';

@Controller('empathy-map')
export class EmpathyMapController {
  constructor(private readonly empathyMapService: EmpathyMapService) {}

  @Post()
  create(@Body() createDto: CreateEmpathyMapDto) {
    return this.empathyMapService.create(createDto);
  }

  @Post('response')
  createResponse(@Body() createDto: CreateEmpathyMapResponseDto) {
    return this.empathyMapService.createResponse(createDto);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.empathyMapService.findAllByProject(+projectId);
  }

  @Get('project/:projectId/responses')
  findAllResponsesByProject(
    @Param('projectId') projectId: string,
    @Query('userId') userId?: string,
  ) {
    return this.empathyMapService.findAllResponsesByProject(
      +projectId,
      userId ? +userId : undefined,
    );
  }

  @Get('project/:projectId/responses/:type')
  getResponsesByType(
    @Param('projectId') projectId: string,
    @Param('type') type: ResponseType,
  ) {
    return this.empathyMapService.getResponsesByType(+projectId, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empathyMapService.findOne(+id);
  }

  @Get('response/:id')
  findOneResponse(@Param('id') id: string) {
    return this.empathyMapService.findOneResponse(+id);
  }

  @Put(':id/upvote')
  upvote(@Param('id') id: string, @Query('userId') userId: string) {
    return this.empathyMapService.upvote(+id, +userId);
  }

  @Put('response/:id/upvote')
  upvoteResponse(@Param('id') id: string, @Query('userId') userId: string) {
    return this.empathyMapService.upvoteResponse(+id, +userId);
  }

  @Delete('response/:id/upvote')
  removeUpvoteResponse(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.empathyMapService.removeUpvoteResponse(+id, +userId);
  }

  @Put('response/:id/toggle-selection')
  toggleResponseSelection(@Param('id') id: string) {
    return this.empathyMapService.toggleResponseSelection(+id);
  }

  @Get('project/:projectId/selected')
  getSelectedByProject(@Param('projectId') projectId: string) {
    return this.empathyMapService.getSelectedByProject(+projectId);
  }

  @Get('project/:projectId/selected-responses')
  getSelectedResponsesByProject(@Param('projectId') projectId: string) {
    return this.empathyMapService.getSelectedResponsesByProject(+projectId);
  }

  @Delete('response/:id')
  deleteResponse(@Param('id') id: string, @Query('userId') userId: string) {
    return this.empathyMapService.deleteResponse(+id, +userId);
  }
}
