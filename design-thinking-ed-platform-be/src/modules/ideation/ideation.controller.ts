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
import { IdeationService } from './ideation.service';
import { CreateIdeationIdeaDto } from './dto/create-ideation-idea.dto';
import { CreateIdeationPointDto } from './dto/create-ideation-point.dto';
import { UpdateIdeationIdeaDto } from './dto/update-ideation-idea.dto';
import { UpdateIdeationPointDto } from './dto/update-ideation-point.dto';

@Controller('ideation')
export class IdeationController {
  constructor(private readonly ideationService: IdeationService) {}

  // Ideas endpoints
  @Post('idea')
  createIdea(@Body() createDto: CreateIdeationIdeaDto) {
    return this.ideationService.createIdea(createDto);
  }

  @Get('idea/:id')
  findOneIdea(@Param('id') id: string) {
    return this.ideationService.findOneIdea(+id);
  }

  @Get('idea')
  findAllIdeasByProject(
    @Query('projectId') projectId: string,
    @Query('userId') userId?: string,
  ) {
    return this.ideationService.findAllIdeasByProject(
      +projectId,
      userId ? +userId : undefined,
    );
  }

  @Put('idea/:id')
  updateIdea(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() updateDto: UpdateIdeationIdeaDto,
  ) {
    return this.ideationService.updateIdea(+id, +userId, updateDto);
  }

  @Delete('idea/:id')
  deleteIdea(@Param('id') id: string, @Query('userId') userId: string) {
    return this.ideationService.deleteIdea(+id, +userId);
  }

  @Post('idea/:id/upvote')
  upvoteIdea(@Param('id') id: string, @Query('userId') userId: string) {
    return this.ideationService.upvoteIdea(+id, +userId);
  }

  // Points endpoints
  @Post('point')
  createPoint(@Body() createDto: CreateIdeationPointDto) {
    return this.ideationService.createPoint(createDto);
  }

  @Put('point/:id')
  updatePoint(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() updateDto: UpdateIdeationPointDto,
  ) {
    return this.ideationService.updatePoint(+id, +userId, updateDto);
  }

  @Delete('point/:id')
  deletePoint(@Param('id') id: string, @Query('userId') userId: string) {
    return this.ideationService.deletePoint(+id, +userId);
  }

  @Post('point/:id/upvote')
  upvotePoint(@Param('id') id: string, @Query('userId') userId: string) {
    return this.ideationService.upvotePoint(+id, +userId);
  }
}
