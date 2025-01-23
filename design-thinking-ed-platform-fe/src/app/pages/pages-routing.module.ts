import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { hasRoleGuard } from '../common/guards/has-role.guard';
import { UserTypeEnum } from '../common/enum/user.enum';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateGroupDialogComponent } from './create-group/create-group.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {}
