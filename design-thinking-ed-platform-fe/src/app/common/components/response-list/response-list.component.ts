import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EmpathyMapResponse } from 'src/app/stores/empathy-map-store/empathy-map.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss'],
})
export class ResponseListComponent implements OnInit {
  @Input() responses$!: Observable<EmpathyMapResponse[]>;
  @Input() displayedColumns: string[] = ['select', 'content', 'actions'];
  @Input() currentUserId!: number;
  @Input() isCurrentUser$!: (userId: number) => Observable<boolean>;
  @Input() loading$!: Observable<boolean>;
  @Input() error$!: Observable<any>;

  dataSource = new MatTableDataSource<EmpathyMapResponse>();

  @Output() upvote = new EventEmitter<{
    responseId: number;
    hasVoted: boolean;
  }>();
  @Output() toggleSelection = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<EmpathyMapResponse>();
  @Output() saveEdit = new EventEmitter<{ id: number; content: string }>();
  @Output() cancelEdit = new EventEmitter<void>();

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

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  startEditing(response: EmpathyMapResponse): void {
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
    this.cancelEdit.emit();
  }
}
