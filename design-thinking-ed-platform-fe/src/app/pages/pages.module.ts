import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStateModule } from '../stores/user-state-store/user-state.module';
import { ClassStateModule } from '../stores/class-state-store/class-state.module';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GroupStateModule } from '../stores/group-state-store/group-state.module';
import { CreateGroupDialogComponent } from './create-group/create-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClassDialogComponent } from './class/class-dialog/class-dialog.component';
import { ProjectComponent } from './project/project.component';
import { MatOptionModule } from '@angular/material/core';
import { EmpathyStepComponent } from './project/components/empathy-step/empathy-step.component';
import { EmpathyMapStateModule } from '../stores/empathy-map-store/empathy-map.module';
import { ChallengeDefinitionStepComponent } from './project/components/challenge-definition-step/challenge-definition-step.component';
import { ProjectStateModule } from '../stores/project-store/project.module';
import { MatExpansionModule } from '@angular/material/expansion';
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
  MatOptionModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
  MatChipsModule,
  MatExpansionModule,
];

const stateModules = [
  UserStateModule,
  ClassStateModule,
  GroupStateModule,
  EmpathyMapStateModule,
  ProjectStateModule,
];

const importModules = [FormsModule, ReactiveFormsModule, ...stateModules];

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
    CreateGroupDialogComponent,
    ProjectComponent,
    EmpathyStepComponent,
    ChallengeDefinitionStepComponent,
  ],
  exports: [PageWrapperComponent],
})
export class PagesModule {}
