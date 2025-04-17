import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemDefinitionDto } from './create-problem-definition.dto';

export class UpdateProblemDefinitionDto extends PartialType(
  CreateProblemDefinitionDto,
) {}
