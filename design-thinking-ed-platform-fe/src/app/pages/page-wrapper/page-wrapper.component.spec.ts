import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { PageWrapperComponent } from './page-wrapper.component';
import { of } from 'rxjs';

describe('PageWrapperComponent', () => {
  let component: PageWrapperComponent;
  let fixture: ComponentFixture<PageWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageWrapperComponent],
      imports: [
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: UserFacade, useValue: { user$: of(null) } }],
    });
    fixture = TestBed.createComponent(PageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
