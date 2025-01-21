import { UserTypeEnum } from '../enum/user.enum';
import { IClass } from './class.interface';

export interface ILoginData {
  email: string | null;
  password: string | null;
}

export interface IUser extends ILoginData {
  id: number;
  userType: UserTypeEnum;
  name: string;
}

export interface IRegisterData extends ILoginData {
  name: string | null;
  studentClass?: Partial<IClass>;
}
