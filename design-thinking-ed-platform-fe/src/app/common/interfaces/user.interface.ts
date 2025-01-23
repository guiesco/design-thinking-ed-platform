import { UserTypeEnum } from '../enum/user.enum';
import { IClass } from './class.interface';
import { IGroup } from './group.interface';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser extends ILoginData {
  id: string;
  userType: UserTypeEnum;
  name: string;
  group: Partial<IGroup>;
  studentClass: IClass;
}

export interface IRegisterData extends ILoginData {
  name: string;
  studentClass?: Partial<IClass>;
}
