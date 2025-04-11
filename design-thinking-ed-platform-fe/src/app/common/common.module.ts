import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ResponseFormComponent } from './components/response-form/response-form.component';

const angularMaterialModules = [
  MatTableModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [ResponseListComponent, ResponseFormComponent],
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModules,
  ],
  exports: [
    ResponseListComponent,
    ResponseFormComponent,
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CommonModule {}
