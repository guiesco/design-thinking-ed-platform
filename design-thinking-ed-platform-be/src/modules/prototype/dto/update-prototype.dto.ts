import { IsOptional, IsString } from 'class-validator';

export class UpdatePrototypeDto {
  @IsString()
  @IsOptional()
  description?: string;
}
