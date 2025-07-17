import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateConclusionDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isFinalized?: boolean;
}
