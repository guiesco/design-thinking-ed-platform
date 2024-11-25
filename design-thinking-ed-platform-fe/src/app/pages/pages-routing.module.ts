import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PageWrapperComponent,
    //   resolve: {
    //     i18nContent: TranslationResolve,
    //   },
    //   runGuardsAndResolvers: 'always',
    //   data: {
    //     i18nContentId: 'common',
    //   },
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'class',
        component: ClassComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule { }
