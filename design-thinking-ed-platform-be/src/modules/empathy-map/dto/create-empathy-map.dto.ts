import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEmpathyMapDto {
  @IsNotEmpty()
  @IsString()
  think: string;

  @IsNotEmpty()
  @IsString()
  feel: string;

  @IsNotEmpty()
  @IsString()
  say: string;

  @IsNotEmpty()
  @IsString()
  do: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
