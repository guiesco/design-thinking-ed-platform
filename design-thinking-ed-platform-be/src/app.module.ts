import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './modules/class/class.module';
import { GroupModule } from './modules/group/group.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'dtep',
      username: 'dtep',
      database: 'dtep',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    ClassModule,
    GroupModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
