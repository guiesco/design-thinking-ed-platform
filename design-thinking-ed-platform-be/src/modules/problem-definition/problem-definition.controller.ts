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
import { ProblemDefinitionService } from './problem-definition.service';
import {
  CreateProblemDefinitionResponseDto,
  CreateProblemDefinitionResponsesDto,
} from './dto/create-problem-definition-response.dto';
import { ProblemDefinitionType } from './entities/problem-definition-response.entity';
import { CreateProblemDefinitionDto } from './dto/create-problem-definition.dto';
import { UpdateProblemDefinitionDto } from './dto/update-problem-definition.dto';

@Controller('problem-definition')
export class ProblemDefinitionController {
  constructor(
    private readonly problemDefinitionService: ProblemDefinitionService,
  ) {}

  @Post()
  create(@Body() dto: CreateProblemDefinitionDto) {
    return this.problemDefinitionService.create(dto);
  }

  @Post('response')
  createResponse(@Body() createDto: CreateProblemDefinitionResponseDto) {
    return this.problemDefinitionService.createResponse(createDto);
  }

  @Post('responses')
  createResponses(@Body() createDto: CreateProblemDefinitionResponsesDto) {
    return this.problemDefinitionService.createResponses(createDto.responses);
  }

  @Get('project/:projectId/responses')
  findAllResponsesByProject(
    @Param('projectId') projectId: string,
    @Query('userId') userId?: string,
  ) {
    return this.problemDefinitionService.findAllResponsesByProject(
      +projectId,
      userId ? +userId : undefined,
    );
  }

  @Get('project/:projectId/responses/:type')
  getResponsesByType(
    @Param('projectId') projectId: string,
    @Param('type') type: ProblemDefinitionType,
  ) {
    return this.problemDefinitionService.getResponsesByType(+projectId, type);
  }

  @Get('response/:id')
  findOneResponse(@Param('id') id: string) {
    return this.problemDefinitionService.findOneResponse(+id);
  }

  @Put('response/:id/upvote')
  upvoteResponse(@Param('id') id: string, @Query('userId') userId: string) {
    return this.problemDefinitionService.upvoteResponse(+id, +userId);
  }

  @Delete('response/:id/upvote')
  removeUpvoteResponse(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.problemDefinitionService.removeUpvoteResponse(+id, +userId);
  }

  @Put('response/:id/toggle-selection')
  toggleResponseSelection(@Param('id') id: string) {
    return this.problemDefinitionService.toggleResponseSelection(+id);
  }

  @Get('project/:projectId/selected-responses')
  getSelectedResponsesByProject(@Param('projectId') projectId: string) {
    return this.problemDefinitionService.getSelectedResponsesByProject(
      +projectId,
    );
  }

  @Delete('response/:id')
  deleteResponse(@Param('id') id: string, @Query('userId') userId: string) {
    return this.problemDefinitionService.deleteResponse(+id, +userId);
  }

  @Put('response/:id')
  updateResponse(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.problemDefinitionService.updateResponse(+id, +userId, content);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemDefinitionService.findOne(+id);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.problemDefinitionService.findByProject(+projectId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProblemDefinitionDto) {
    return this.problemDefinitionService.update(+id, dto);
  }
}
