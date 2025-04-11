import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClassDialogComponent } from './class-dialog.component';

describe('ClassDialogComponent', () => {
  let component: ClassDialogComponent;
  let fixture: ComponentFixture<ClassDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDialogComponent],
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { groups: [] } },
      ],
    });
    fixture = TestBed.createComponent(ClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
