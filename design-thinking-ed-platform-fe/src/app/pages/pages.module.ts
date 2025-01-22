import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStateModule } from '../stores/user-state-store/user-state.module';
import { ClassStateModule } from '../stores/class-state-store/class-state.module';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClassDialogComponent } from './class/class-dialog/class-dialog.component';

const angularMaterialModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  // BrowserAnimationsModule,
];

const importModules = [
  FormsModule,
  ReactiveFormsModule,
  UserStateModule,
  ClassStateModule,
];

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ...angularMaterialModules,
    ...importModules,
  ],
  declarations: [
    PageWrapperComponent,
    LoginComponent,
    RegisterComponent,
    ClassComponent,
    CreateClassComponent,
    HomepageComponent,
    ClassDialogComponent,
  ],
  exports: [PageWrapperComponent],
})
export class PagesModule { }
