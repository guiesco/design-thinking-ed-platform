import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIdeationIdeaDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
