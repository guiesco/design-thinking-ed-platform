import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModel } from './common/models/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(): UserModel {
    return this.appService.login();
  }
}
