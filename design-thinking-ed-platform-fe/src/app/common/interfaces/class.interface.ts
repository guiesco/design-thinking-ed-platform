import { IUser } from './user.interface';
import { ProjectSteps } from '../enum/class.enum';
import { IGroup } from './group.interface';

export interface IFindClass extends Partial<IClass> {
  skip: number;
  take: number;
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
  groups: IGroup[] | null
}
