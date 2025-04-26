import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIdeationPointDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
