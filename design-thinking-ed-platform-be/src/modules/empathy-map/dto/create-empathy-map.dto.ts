import { IsNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateEmpathyMapDto {
  @IsNotEmpty()
  @IsArray()
  think: string[];

  @IsNotEmpty()
  @IsArray()
  feel: string[];

  @IsNotEmpty()
  @IsArray()
  say: string[];

  @IsNotEmpty()
  @IsArray()
  do: string[];

  @IsNotEmpty()
  @IsArray()
  pains: string[];

  @IsNotEmpty()
  @IsArray()
  needs: string[];

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
