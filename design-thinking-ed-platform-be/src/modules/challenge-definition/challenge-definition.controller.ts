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
import { CreateChallengeDefinitionResponseDto } from './dto/create-challenge-definition-response.dto';

@Controller('challenge-definition')
export class ChallengeDefinitionController {
  constructor(
    private readonly challengeDefinitionService: ChallengeDefinitionService,
  ) {}

  @Get('response/project/:projectId')
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
  toggleResponseSelection(@Param('id') id: string) {
    return this.challengeDefinitionService.toggleResponseSelection(Number(id));
  }
}
