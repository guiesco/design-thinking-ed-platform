import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ResponseType } from '../entities/empathy-map-response.entity';

export class CreateEmpathyMapResponseDto {
  @IsNotEmpty()
  @IsEnum(ResponseType)
  type: ResponseType;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
