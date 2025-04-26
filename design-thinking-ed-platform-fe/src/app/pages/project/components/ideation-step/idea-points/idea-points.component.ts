import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import {
  IdeationPoint,
  IdeationPointType,
  IdeationPointTypeLabel,
} from '../../../../../common/interfaces/ideation.interface';
import { IdeationFacade } from '../../../../../stores/ideation-store/ideation.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { IUser } from 'src/app/common/interfaces/user.interface';

@Component({
  selector: 'app-idea-points',
  templateUrl: './idea-points.component.html',
  styleUrls: ['./idea-points.component.scss'],
})
export class IdeaPointsComponent implements OnInit {
  @Input() ideaId!: number;
  @Input() type!: string;
  @Input() userId!: number;
  @Input() points!: IdeationPoint[];
  @Input() highlightedPointId: number | null = null;

  @Output() addPoint = new EventEmitter<{
    ideaId: number;
    content: string;
    type: IdeationPointType;
  }>();
  @Output() deletePoint = new EventEmitter<{
    pointId: number;
    ideaId: number;
  }>();
  @Output() upvotePoint = new EventEmitter<number>();

  pointTypeEnum = IdeationPointType;
  pointTypeLabel = IdeationPointTypeLabel;
  newPointContent = '';
  editingPointId: number | null = null;
  editingPointContent = '';
  currentUserId!: number;

  constructor(
    private ideationFacade: IdeationFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user: IUser | null) => {
      if (user?.id) {
        this.currentUserId = Number(user.id);
      }
    });
  }

  getTypeLabel(): string {
    return this.type === IdeationPointType.PRO
      ? IdeationPointTypeLabel.PRO
      : IdeationPointTypeLabel.CON;
  }

  onAddPoint(): void {
    if (!this.newPointContent.trim()) {
      return;
    }

    this.addPoint.emit({
      ideaId: this.ideaId,
      content: this.newPointContent,
      type: this.type as IdeationPointType,
    });

    this.newPointContent = '';
  }

  onDeletePoint(pointId: number, ideaId: number): void {
    this.deletePoint.emit({ pointId, ideaId });
  }

  onUpvotePoint(pointId: number): void {
    this.upvotePoint.emit(pointId);
  }

  startEditing(point: IdeationPoint): void {
    this.editingPointId = point.id;
    this.editingPointContent = point.content;
  }

  saveEditing(): void {
    if (!this.editingPointContent.trim() || !this.editingPointId) {
      return;
    }

    this.ideationFacade.updatePoint(this.editingPointId, this.userId, {
      content: this.editingPointContent,
    });

    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingPointId = null;
    this.editingPointContent = '';
  }

  // Verificar se um ponto deve ser destacado
  shouldHighlightPoint(pointId: number): boolean {
    return this.highlightedPointId === pointId;
  }
}
