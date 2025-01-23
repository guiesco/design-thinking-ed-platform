import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class FindGroupDto extends PartialType(CreateGroupDto) {
  take: number;
  skip: number;
}
