import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { CreateClassComponent } from './create-class.component';

describe('CreateClassComponent', () => {
  let component: CreateClassComponent;
  let fixture: ComponentFixture<CreateClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClassComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ClassFacade, useValue: { create: () => {} } },
        {
          provide: UserFacade,
          useValue: {
            user$: { pipe: () => {}, take: () => {}, toPromise: () => {} },
          },
        },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });
    fixture = TestBed.createComponent(CreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
