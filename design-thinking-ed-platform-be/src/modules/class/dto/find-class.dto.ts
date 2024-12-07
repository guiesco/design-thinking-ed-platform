import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';

export class FindClassDto extends PartialType(CreateClassDto) {
  limit: number;
  offset: number;
}
