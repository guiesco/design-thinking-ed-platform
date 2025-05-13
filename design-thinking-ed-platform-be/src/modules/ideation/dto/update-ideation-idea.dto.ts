import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateIdeationIdeaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isSelected?: boolean;
}
