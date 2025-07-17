import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdatePrototypeDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isFinalized?: boolean;
}
