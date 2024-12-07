import { IUser } from './user.interface';
import { ProjectSteps } from '../enum/class.enum';

export interface IFindClass extends Partial<IClass> {
  offset: number;
  limit: number;
}

export interface ICreateClass {
  className: string | null;
  invitedStudents: string[] | null;
  semester: string | null;
  professor?: Partial<IUser> | null;
}

export interface IClass extends ICreateClass {
  id: number;
  projectStep?: ProjectSteps | null;
}
