import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { MetricsFacade } from 'src/app/stores/metrics-store/metrics.facade';
import {
  ProjectMetricsResponse,
  StudentMetrics,
} from 'src/app/stores/metrics-store/metrics.interface';

@Component({
  selector: 'app-metrics-step',
  templateUrl: './metrics-step.component.html',
  styleUrls: ['./metrics-step.component.scss'],
})
export class MetricsStepComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  projectId: number = 0;
  currentUserId: number = 0;

  metrics: ProjectMetricsResponse | null = null;
  isLoading = false;
  error: string | null = null;

  displayedColumns: string[] = [
    'name',
    'totalInteractions',
    'givenLikes',
    'createdResponses',
    'selectedResponses',
  ];

  constructor(
    private route: ActivatedRoute,
    private userFacade: UserFacade,
    private metricsFacade: MetricsFacade
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializeProjectId();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getTotalInteractions(): number {
    return (
      this.metrics?.students.reduce(
        (sum, student) => sum + student.totalInteractions,
        0
      ) || 0
    );
  }

  getTotalGivenLikes(): number {
    return (
      this.metrics?.students.reduce(
        (sum, student) => sum + student.givenLikes,
        0
      ) || 0
    );
  }

  getTotalCreatedResponses(): number {
    return (
      this.metrics?.students.reduce(
        (sum, student) => sum + student.createdResponses,
        0
      ) || 0
    );
  }

  getTotalSelectedResponses(): number {
    return (
      this.metrics?.students.reduce(
        (sum, student) => sum + student.selectedResponses,
        0
      ) || 0
    );
  }

  private initializeUser(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.currentUserId = user.id;
      }
    });
  }

  private initializeProjectId(): void {
    const projectId = this.route.parent?.snapshot.params['projectId'];
    if (projectId) {
      this.projectId = Number(projectId);
    }
  }

  private setupSubscriptions(): void {
    this.metricsFacade.metrics$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((metrics) => {
        this.metrics = metrics;
      });

    this.metricsFacade.isLoading$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

    this.metricsFacade.error$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error) => {
        this.error = error;
      });

    // Carregar métricas apenas se tiver projectId e userId
    if (this.projectId && this.currentUserId) {
      this.metricsFacade.loadMetrics(this.projectId, this.currentUserId);
    }
  }
}
