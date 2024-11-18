import { Component } from '@angular/core';

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
