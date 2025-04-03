import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResponseType } from '../entities/challenge-definition-response.entity';

export class CreateChallengeDefinitionResponseDto {
  @IsEnum(ResponseType)
  type: ResponseType;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  projectId: number;

  @IsNumber()
  userId: number;
}
