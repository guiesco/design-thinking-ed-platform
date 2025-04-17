import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProblemDefinitionType } from '../entities/problem-definition-response.entity';

export class CreateProblemDefinitionResponseDto {
  @IsEnum(ProblemDefinitionType)
  @IsNotEmpty()
  type: ProblemDefinitionType;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}

export class CreateProblemDefinitionResponsesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProblemDefinitionResponseDto)
  responses: CreateProblemDefinitionResponseDto[];
}
