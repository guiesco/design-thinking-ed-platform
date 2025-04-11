import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { CreateGroupDialogComponent } from './create-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateGroupDialogComponent', () => {
  let component: CreateGroupDialogComponent;
  let fixture: ComponentFixture<CreateGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupDialogComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: GroupFacade, useValue: {} },
        {
          provide: UserFacade,
          useValue: {
            user$: of(null),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CreateGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
