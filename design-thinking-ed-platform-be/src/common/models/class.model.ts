import { ProjectSteps } from '../enum/project.enum';
import { UserModel } from './user.model';

export interface ClassModel {
  students: UserModel[];
  professor: UserModel;
  projectStep: ProjectSteps;
  className: string;
  classNumber: number;
  classTime: string;
}
