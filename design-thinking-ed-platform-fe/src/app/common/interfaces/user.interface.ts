import { UserTypeEnum } from '../enum/user.enum';

export interface ILoginData {
  email: string | null;
  password: string | null;
}

export interface IUser extends ILoginData {
  userType: UserTypeEnum;
  name: string;
}

export interface IRegisterData extends ILoginData {
  name: string | null;
}
