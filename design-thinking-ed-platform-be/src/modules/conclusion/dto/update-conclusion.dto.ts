import { IsOptional, IsString } from 'class-validator';

export class UpdateConclusionDto {
  @IsString()
  @IsOptional()
  description?: string;
}
