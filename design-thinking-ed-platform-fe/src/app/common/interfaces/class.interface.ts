import { IUser } from './user.interface';
import { ProjectSteps } from '../enum/class.enum';
import { IGroup } from './group.interface';

export interface IFindClass extends Partial<IClass> {
  skip: number;
  take: number;
}

export interface ICreateClass {
  className: string;
  invitedStudents: string[];
  semester: string;
  professor: Partial<IUser>;
}

export interface IClass extends ICreateClass {
  id: string;
  projectStep?: ProjectSteps;
  groups: IGroup[];
}
