import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent {
  isSidenavOpen = true;

  constructor(readonly userFacade: UserFacade) {}

  readonly isUserProfessor$ = this.userFacade.user$.pipe(
    map((user) => user?.userType === UserTypeEnum.PROFESSOR)
  );

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
