import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConclusionDto {
  @IsNumber()
  projectId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
