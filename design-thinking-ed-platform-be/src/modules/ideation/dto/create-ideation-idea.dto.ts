import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIdeationIdeaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
