import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChallengeDefinitionDto {
  @IsArray()
  @IsNotEmpty()
  problems: string[];

  @IsArray()
  @IsNotEmpty()
  targetAudience: string[];

  @IsArray()
  @IsNotEmpty()
  howWeCan: string[];

  @IsArray()
  @IsNotEmpty()
  brainstorm: string[];

  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;
}
