import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
