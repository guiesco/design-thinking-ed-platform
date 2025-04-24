import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ChallengeDefinitionService } from './challenge-definition.service';
import {
  CreateChallengeDefinitionResponseDto,
  CreateChallengeDefinitionResponsesDto,
} from './dto/create-challenge-definition-response.dto';
import { ChallengeDefinitionResponse } from './entities/challenge-definition-response.entity';
import { CreateChallengeDefinitionDto } from './dto/create-challenge-definition.dto';

@Controller('challenge-definition')
export class ChallengeDefinitionController {
  constructor(
    private readonly challengeDefinitionService: ChallengeDefinitionService,
  ) {}

  @Post()
  create(@Body() dto: CreateChallengeDefinitionDto) {
    return this.challengeDefinitionService.create(dto);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.challengeDefinitionService.findByProject(+projectId);
  }

  @Get('project/:projectId/responses')
  findAllResponsesByProject(
    @Param('projectId') projectId: string,
    @Query('userId') userId?: string,
  ) {
    return this.challengeDefinitionService.findAllResponsesByProject(
      Number(projectId),
      userId ? Number(userId) : undefined,
    );
  }

  @Post('response')
  createResponse(
    @Body() createResponseDto: CreateChallengeDefinitionResponseDto,
  ) {
    return this.challengeDefinitionService.createResponse(createResponseDto);
  }

  @Post('responses')
  createResponses(
    @Body() createResponsesDto: CreateChallengeDefinitionResponsesDto,
  ) {
    return this.challengeDefinitionService.createResponses(
      createResponsesDto.responses,
    );
  }

  @Patch('response/:id')
  updateResponse(
    @Param('id') id: string,
    @Body() updateResponseDto: { content: string; userId: string },
  ) {
    return this.challengeDefinitionService.updateResponse(
      Number(id),
      Number(updateResponseDto.userId),
      updateResponseDto.content,
    );
  }

  @Delete('response/:id')
  deleteResponse(@Param('id') id: string) {
    return this.challengeDefinitionService.deleteResponse(Number(id));
  }

  @Post('response/:id/upvote')
  upvoteResponse(@Param('id') id: string, @Query('userId') userId: string) {
    return this.challengeDefinitionService.upvoteResponse(
      Number(id),
      Number(userId),
    );
  }

  @Delete('response/:id/upvote')
  removeVote(@Param('id') id: string, @Query('userId') userId: string) {
    return this.challengeDefinitionService.removeVote(
      Number(id),
      Number(userId),
    );
  }

  @Post('response/:id/toggle-selection')
  async toggleResponseSelection(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<ChallengeDefinitionResponse> {
    return this.challengeDefinitionService.toggleResponseSelection(
      parseInt(id),
      parseInt(userId),
    );
  }
}
