import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
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

export class CreateChallengeDefinitionResponsesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChallengeDefinitionResponseDto)
  responses: CreateChallengeDefinitionResponseDto[];
}
