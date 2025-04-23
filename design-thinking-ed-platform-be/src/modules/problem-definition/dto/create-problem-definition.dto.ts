import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateProblemDefinitionDto {
  @IsArray()
  @IsNotEmpty()
  mainQuestion: string[];

  @IsArray()
  @IsNotEmpty()
  targetAudience: string[];

  @IsArray()
  @IsNotEmpty()
  consequences: string[];

  @IsArray()
  @IsNotEmpty()
  alternativeView: string[];

  @IsArray()
  @IsNotEmpty()
  socialFactors: string[];

  @IsArray()
  @IsNotEmpty()
  problemDefinition: string[];

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
