import { IClass } from './class.interface';
import { IUser } from './user.interface';

export interface IGroup {
  id: string;
  groupName: string;
  students: Partial<IUser>[];
  class: Partial<IClass>;
}

export interface ICreateGroup extends Partial<IGroup> {}

export interface IFindGroup extends Partial<IGroup> {
  skip: number;
  take: number;
}
