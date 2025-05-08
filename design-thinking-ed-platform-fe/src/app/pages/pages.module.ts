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
import { ChallengeDefinitionModule } from '../stores/challenge-definition-store/challenge-definition.module';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { MatStepperModule } from '@angular/material/stepper';
import { ProblemDefinitionStepComponent } from './project/components/problem-definition-step/problem-definition-step.component';
import { ProblemDefinitionStoreModule } from '../stores/problem-definition-store/problem-definition.module';
import { IdeationStepComponent } from './project/components/ideation-step/ideation-step.component';
import { IdeationStateModule } from '../stores/ideation-store/ideation.module';
import { IdeaPointsComponent } from './project/components/ideation-step/idea-points/idea-points.component';
import { PrototypingStepComponent } from './project/components/prototyping-step/prototyping-step.component';
import { PrototypeStoreModule } from '../stores/prototype-store/prototype.module';
import { ConclusionStepComponent } from './project/components/conclusion-step/conclusion-step.component';
import { ConclusionStoreModule } from '../stores/conclusion-store/conclusion.module';
import { MetricsStepComponent } from './project/components/metrics-step/metrics-step.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metricsReducer } from '../stores/metrics-store/metrics.reducer';
import { MetricsEffects } from '../stores/metrics-store/metrics.effects';

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
  MatStepperModule,
];

const stateModules = [
  UserStateModule,
  ClassStateModule,
  GroupStateModule,
  EmpathyMapStateModule,
  ProjectStateModule,
  ChallengeDefinitionModule,
  ProblemDefinitionStoreModule,
  IdeationStateModule,
  PrototypeStoreModule,
  ConclusionStoreModule,
];

const importModules = [FormsModule, ReactiveFormsModule, ...stateModules];

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    PagesRoutingModule,
    ...angularMaterialModules,
    ...importModules,
    StoreModule.forFeature('metrics', metricsReducer),
    EffectsModule.forFeature([MetricsEffects]),
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
    ProblemDefinitionStepComponent,
    IdeationStepComponent,
    IdeaPointsComponent,
    PrototypingStepComponent,
    ConclusionStepComponent,
    MetricsStepComponent,
  ],
  exports: [PageWrapperComponent],
})
export class PagesModule {}
