import { Component } from '@angular/core';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent {
  isSidenavOpen = true; // Para controlar o menu lateral

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
