import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ResponseListComponent } from './response-list.component';
import { ResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { IResponse } from '../../interfaces/response.interface';

describe('ResponseListComponent', () => {
  let component: ResponseListComponent;
  let fixture: ComponentFixture<ResponseListComponent>;

  const mockResponses: IResponse[] = [
    {
      id: 1,
      content: 'Test content',
      userId: 1,
      type: ResponseType.THINK,
      projectId: 1,
      upvotes: 0,
      hasVoted: false,
      isSelected: false,
      votesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseListComponent],
      imports: [
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseListComponent);
    component = fixture.componentInstance;
    component.responses$ = of(mockResponses);
    component.displayedColumns = ['select', 'content', 'actions'];
    component.currentUserId = 1;
    component.isCurrentUser$ = () => of(true);
    component.loading$ = of(false);
    component.error$ = of(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit upvote event', () => {
    spyOn(component.upvote, 'emit');
    component.onUpvote(1, false);
    expect(component.upvote.emit).toHaveBeenCalledWith({
      responseId: 1,
      hasVoted: false,
    });
  });

  it('should emit toggle selection event', () => {
    spyOn(component.toggleSelection, 'emit');
    component.onToggleSelection(1);
    expect(component.toggleSelection.emit).toHaveBeenCalledWith(1);
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(1);
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should start editing', () => {
    const mockResponse = mockResponses[0];
    spyOn(component.edit, 'emit');
    component.startEditing(mockResponse);
    expect(component.editingResponseId).toBe(mockResponse.id);
    expect(component.editingContent).toBe(mockResponse.content);
    expect(component.edit.emit).toHaveBeenCalledWith(mockResponse);
  });

  it('should save edit', () => {
    spyOn(component.saveEdit, 'emit');
    component.editingResponseId = 1;
    component.editingContent = 'Updated content';
    component.onSaveEdit();
    expect(component.saveEdit.emit).toHaveBeenCalledWith({
      id: 1,
      content: 'Updated content',
    });
    expect(component.editingResponseId).toBeNull();
    expect(component.editingContent).toBe('');
  });

  it('should cancel edit', () => {
    component.editingResponseId = 1;
    component.editingContent = 'Test content';
    component.onCancelEdit();
    expect(component.editingResponseId).toBeNull();
    expect(component.editingContent).toBe('');
  });
});
