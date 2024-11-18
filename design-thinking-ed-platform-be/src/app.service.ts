import { Injectable } from '@nestjs/common';
import { UserModel } from './common/models/user.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(): UserModel {
    return {} as UserModel;
  }
}
