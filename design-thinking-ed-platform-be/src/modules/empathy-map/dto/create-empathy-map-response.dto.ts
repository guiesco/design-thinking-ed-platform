import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseType } from '../entities/empathy-map-response.entity';

export class CreateEmpathyMapResponseDto {
  @IsEnum(ResponseType)
  @IsNotEmpty()
  type: ResponseType;

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

export class CreateEmpathyMapResponsesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEmpathyMapResponseDto)
  responses: CreateEmpathyMapResponseDto[];
}
