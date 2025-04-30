import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FileStepType } from '../entities/uploaded-file.entity';

export class UploadFileDto {
  @IsNumber()
  projectId: number;

  @IsNumber()
  userId: number;

  @IsEnum(FileStepType)
  stepType: FileStepType;

  @IsNumber()
  @IsOptional()
  groupId?: number;
}
