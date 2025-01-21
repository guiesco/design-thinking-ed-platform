import { IUser } from './user.interface';
import { ProjectSteps } from '../enum/class.enum';

export interface ICreateClass {
  className: string | null;
  invitedStudents: string[] | null;
  semester: string | null;
  professor?: IUser | null;
}

export interface IClass extends ICreateClass {
  id: string;
  projectStep?: ProjectSteps | null;
}
