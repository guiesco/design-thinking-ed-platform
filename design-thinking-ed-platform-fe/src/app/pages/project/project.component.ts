import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projectId: number = 0;
  currentStep: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params['projectId'];
    });

    this.route.firstChild?.url.subscribe((segments) => {
      if (segments.length > 0) {
        this.currentStep = segments[0].path;
      }
    });
  }
}
