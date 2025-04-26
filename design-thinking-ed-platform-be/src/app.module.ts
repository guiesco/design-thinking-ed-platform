import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './modules/class/class.module';
import { GroupModule } from './modules/group/group.module';
import { ProjectModule } from './modules/project/project.module';
import { EmpathyMapModule } from './modules/empathy-map/empathy-map.module';
import { ChallengeDefinitionModule } from './modules/challenge-definition/challenge-definition.module';
import { UserVoteModule } from './modules/user-vote/user-vote.module';
import { ProblemDefinitionModule } from './modules/problem-definition/problem-definition.module';
import { MailModule } from './modules/mail/mail.module';
import { IdeationModule } from './modules/ideation/ideation.module';

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
    EmpathyMapModule,
    UserVoteModule,
    ChallengeDefinitionModule,
    ProblemDefinitionModule,
    MailModule,
    IdeationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
