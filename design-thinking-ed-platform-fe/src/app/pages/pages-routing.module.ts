import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { hasRoleGuard } from '../common/guards/has-role.guard';
import { UserTypeEnum } from '../common/enum/user.enum';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateGroupDialogComponent } from './create-group/create-group.component';
import { EmpathyStepComponent } from './project/components/empathy-step/empathy-step.component';
import { ProjectComponent } from './project/project.component';
import { ChallengeDefinitionStepComponent } from './project/components/challenge-definition-step/challenge-definition-step.component';
import { ProblemDefinitionStepComponent } from './project/components/problem-definition-step/problem-definition-step.component';
import { IdeationStepComponent } from './project/components/ideation-step/ideation-step.component';
import { PrototypingStepComponent } from './project/components/prototyping-step/prototyping-step.component';
import { ConclusionStepComponent } from './project/components/conclusion-step/conclusion-step.component';
import { MetricsStepComponent } from './project/components/metrics-step/metrics-step.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PageWrapperComponent,
    runGuardsAndResolvers: 'always',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomepageComponent,
        canActivate: [hasRoleGuard],
        data: {
          roles: [UserTypeEnum.PROFESSOR, UserTypeEnum.STUDENT],
          redirectPath: 'login',
        },
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'class',
        component: ClassComponent,
        canActivate: [hasRoleGuard],
        data: {
          roles: [UserTypeEnum.PROFESSOR],
          redirectPath: 'home',
        },
      },
      {
        path: 'class/:classId',
        component: ClassDetailsComponent,
        canActivate: [hasRoleGuard],
        data: {
          roles: [UserTypeEnum.PROFESSOR],
          redirectPath: 'home',
        },
      },
      {
        path: 'create-class',
        component: CreateClassComponent,
        canActivate: [hasRoleGuard],
        data: {
          roles: [UserTypeEnum.PROFESSOR],
          redirectPath: 'home',
        },
      },
      {
        path: 'create-group',
        component: CreateGroupDialogComponent,
        canActivate: [hasRoleGuard],
        data: {
          roles: [UserTypeEnum.PROFESSOR, UserTypeEnum.STUDENT],
          redirectPath: 'home',
        },
      },
      {
        path: 'project/:projectId',
        component: ProjectComponent,
        children: [
          {
            path: 'empathy',
            component: EmpathyStepComponent,
          },
          {
            path: 'challenge-definition',
            component: ChallengeDefinitionStepComponent,
          },
          {
            path: 'problem-definition',
            component: ProblemDefinitionStepComponent,
          },
          {
            path: 'ideate',
            component: IdeationStepComponent,
          },
          {
            path: 'prototype',
            component: PrototypingStepComponent,
          },
          {
            path: 'conclusion',
            component: ConclusionStepComponent,
          },
          {
            path: 'metrics',
            component: MetricsStepComponent,
            canActivate: [hasRoleGuard],
            data: {
              roles: [UserTypeEnum.PROFESSOR],
              redirectPath: 'home',
            },
          },
          {
            path: '',
            redirectTo: 'empathy',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {}
