import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [
        { provide: MatDialog, useValue: {} },
        {
          provide: UserFacade,
          useValue: { user$: { pipe: () => ({ subscribe: () => {} }) } },
        },
        { provide: GroupFacade, useValue: { loadGroups: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
