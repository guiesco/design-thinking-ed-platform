import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectId: number = 0;
  currentStep: string = '';
  isProfessor: boolean = false;
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  private updateCurrentStep(): void {
    const urlSegments = this.router.url.split('/');
    const stepIndex = urlSegments.findIndex((segment) => segment === 'project');
    if (stepIndex !== -1 && urlSegments[stepIndex + 2]) {
      this.currentStep = urlSegments[stepIndex + 2];
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params['projectId'];
    });

    // Verificar se o usuário é professor
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.isProfessor = user.userType === 'professor';
      }
    });

    // Atualiza o currentStep na inicialização
    this.updateCurrentStep();

    // Observa as mudanças de navegação
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCurrentStep();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
