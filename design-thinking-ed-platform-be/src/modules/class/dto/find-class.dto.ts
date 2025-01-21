import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';

export class FindClassDto extends PartialType(CreateClassDto) {
  take: number;
  skip: number;
}
