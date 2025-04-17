import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProblemDefinitionDto {
  @IsString()
  @IsNotEmpty()
  mainQuestion: string;

  @IsString()
  @IsNotEmpty()
  targetAudience: string;

  @IsString()
  @IsNotEmpty()
  consequences: string;

  @IsString()
  @IsNotEmpty()
  alternativeView: string;

  @IsString()
  @IsNotEmpty()
  socialFactors: string;

  @IsString()
  @IsNotEmpty()
  problemDefinition: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
