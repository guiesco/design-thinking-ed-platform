import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { ClassComponent } from './class.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ClassComponent', () => {
  let component: ClassComponent;
  let fixture: ComponentFixture<ClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassComponent],
      imports: [MatCardModule, RouterModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        {
          provide: ClassFacade,
          useValue: { classes$: of([]), loadClasses: () => {} },
        },
        {
          provide: UserFacade,
          useValue: { user$: of(null) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            parent: {
              snapshot: {
                params: {},
                paramMap: {
                  get: () => null,
                },
              },
              paramMap: of({
                get: () => null,
              }),
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
