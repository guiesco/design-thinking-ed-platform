import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/response.interface';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss'],
})
export class ResponseListComponent implements OnInit {
  @Input() responses$!: Observable<IResponse[]>;
  @Input() displayedColumns: string[] = ['select', 'content', 'actions'];
  @Input() currentUserId!: number;
  @Input() isCurrentUser$!: (userId: number) => Observable<boolean>;
  @Input() loading$!: Observable<boolean>;
  @Input() error$!: Observable<any>;

  @Output() upvote = new EventEmitter<{
    responseId: number;
    hasVoted: boolean;
  }>();
  @Output() toggleSelection = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<IResponse>();
  @Output() saveEdit = new EventEmitter<{ id: number; content: string }>();
  @Output() refresh = new EventEmitter<void>();

  dataSource = new MatTableDataSource<IResponse>();
  editingResponseId: number | null = null;
  editingContent: string = '';

  ngOnInit() {
    this.responses$.subscribe((responses) => {
      this.dataSource.data = responses;
    });
  }

  onUpvote(responseId: number, hasVoted: boolean): void {
    this.upvote.emit({ responseId, hasVoted });
  }

  onToggleSelection(responseId: number): void {
    this.toggleSelection.emit(responseId);
  }

  onDelete(responseId: number): void {
    this.delete.emit(responseId);
  }

  startEditing(response: IResponse): void {
    this.editingResponseId = response.id;
    this.editingContent = response.content;
    this.edit.emit(response);
  }

  onSaveEdit(): void {
    if (this.editingResponseId) {
      this.saveEdit.emit({
        id: this.editingResponseId,
        content: this.editingContent,
      });
      this.editingResponseId = null;
      this.editingContent = '';
    }
  }

  onCancelEdit(): void {
    this.editingResponseId = null;
    this.editingContent = '';
  }

  refreshData(): void {
    this.refresh.emit();
  }
}
