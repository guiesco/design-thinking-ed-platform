import { UserTypeEnum } from '../enum/user.enum';

export interface UserModel {
  userType: UserTypeEnum;
  name: string;
  email: string;
  password: string;
}
