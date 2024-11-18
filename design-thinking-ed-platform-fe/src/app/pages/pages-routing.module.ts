import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

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
        path: 'login',
        loadChildren: () => LoginComponent,
        // canActivate: [NonAuthGuard],
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
