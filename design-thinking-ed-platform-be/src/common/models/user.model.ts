import { UserTypeEnum } from '../enum/user.enum';

export interface UserModel {
  userType: UserTypeEnum;
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string | null;
  password: string | null;
}

export interface IUser extends ILoginData {
  userType: UserTypeEnum;
  name: string;
}
