import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(readonly userFacade: UserFacade) {}

  readonly isUserProfessor$ = this.userFacade.user$.pipe(
    map((user) => user?.userType === UserTypeEnum.PROFESSOR)
  );
}
