import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IdeationPoint,
  IdeationPointType,
  IdeationPointTypeLabel,
} from '../../../../../common/interfaces/ideation.interface';
import { IdeationFacade } from '../../../../../stores/ideation-store/ideation.facade';

@Component({
  selector: 'app-idea-points',
  templateUrl: './idea-points.component.html',
  styleUrls: ['./idea-points.component.scss'],
})
export class IdeaPointsComponent implements OnInit {
  @Input() ideaId!: number;
  @Input() type!: string;
  @Input() userId!: number;

  @Output() addPoint = new EventEmitter<{
    ideaId: number;
    content: string;
    type: IdeationPointType;
  }>();
  @Output() deletePoint = new EventEmitter<number>();
  @Output() upvotePoint = new EventEmitter<number>();

  points$!: Observable<IdeationPoint[]>;
  pointTypeEnum = IdeationPointType;
  pointTypeLabel = IdeationPointTypeLabel;
  newPointContent = '';
  editingPointId: number | null = null;
  editingPointContent = '';

  constructor(private ideationFacade: IdeationFacade) {}

  ngOnInit(): void {
    if (this.type === 'PRO') {
      this.points$ = this.ideationFacade.getProsByIdeaId(this.ideaId);
    } else {
      this.points$ = this.ideationFacade.getConsByIdeaId(this.ideaId);
    }
    this.ideationFacade.loadPointsByIdea(this.ideaId);
  }

  getTypeLabel(): string {
    return this.type === 'PRO' ? 'Prós' : 'Contras';
  }

  onAddPoint(): void {
    if (!this.newPointContent.trim()) {
      return;
    }
    this.addPoint.emit({
      ideaId: this.ideaId,
      content: this.newPointContent,
      type: this.type === 'PRO' ? IdeationPointType.PRO : IdeationPointType.CON,
    });
    this.newPointContent = '';
  }

  onDeletePoint(pointId: number): void {
    this.deletePoint.emit(pointId);
  }

  onUpvotePoint(pointId: number): void {
    this.upvotePoint.emit(pointId);
  }

  startEditing(point: IdeationPoint): void {
    this.editingPointId = point.id;
    this.editingPointContent = point.content;
  }

  cancelEditing(): void {
    this.editingPointId = null;
    this.editingPointContent = '';
  }

  saveEditing(): void {
    if (!this.editingPointContent.trim() || !this.editingPointId) {
      return;
    }

    this.ideationFacade.updatePoint(this.editingPointId, {
      content: this.editingPointContent,
    });

    this.cancelEditing();
  }
}
