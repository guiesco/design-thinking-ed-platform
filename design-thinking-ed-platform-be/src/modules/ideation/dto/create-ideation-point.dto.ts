import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IdeationPointType } from '../entities/ideation-point.entity';

export class CreateIdeationPointDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(IdeationPointType)
  @IsNotEmpty()
  type: IdeationPointType;

  @IsNumber()
  @IsNotEmpty()
  ideaId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
