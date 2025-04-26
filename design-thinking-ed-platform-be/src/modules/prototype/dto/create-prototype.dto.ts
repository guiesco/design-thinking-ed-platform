import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePrototypeDto {
  @IsNumber()
  projectId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
