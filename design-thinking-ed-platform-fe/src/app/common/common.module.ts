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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ResponseFormComponent } from './components/response-form/response-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InfoDisplayComponent } from './components/info-display/info-display.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const angularMaterialModules = [
  MatTableModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatTooltipModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    ResponseListComponent,
    ResponseFormComponent,
    ConfirmationDialogComponent,
    InfoDisplayComponent,
    FileUploadComponent,
  ],
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModules,
  ],
  exports: [
    ResponseListComponent,
    ResponseFormComponent,
    ConfirmationDialogComponent,
    InfoDisplayComponent,
    FileUploadComponent,
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...angularMaterialModules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CommonModule {}
