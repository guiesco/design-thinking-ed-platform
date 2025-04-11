import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '../../common.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResponseListComponent } from './response-list.component';
import { of } from 'rxjs';
import { ResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';

describe('ResponseListComponent', () => {
  let component: ResponseListComponent;
  let fixture: ComponentFixture<ResponseListComponent>;

  const mockResponses = [
    {
      id: 1,
      content: 'Test content 1',
      userId: 1,
      type: ResponseType.THINK,
      projectId: 1,
      upvotes: 0,
      hasVoted: false,
      isSelected: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      content: 'Test content 2',
      userId: 2,
      type: ResponseType.FEEL,
      projectId: 1,
      upvotes: 1,
      hasVoted: true,
      isSelected: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseListComponent);
    component = fixture.componentInstance;
    component.responses$ = of(mockResponses);
    component.currentUserId = 1;
    component.isCurrentUser$ = (userId: number) => of(userId === 1);
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

  it('should handle start editing', () => {
    const mockResponse = mockResponses[0];
    component.startEditing(mockResponse);
    expect(component.editingResponseId).toBe(1);
    expect(component.editingContent).toBe('Test content 1');
  });

  it('should handle save edit', () => {
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

  it('should handle cancel edit', () => {
    spyOn(component.cancelEdit, 'emit');
    component.editingResponseId = 1;
    component.editingContent = 'Test content';
    component.onCancelEdit();
    expect(component.cancelEdit.emit).toHaveBeenCalled();
    expect(component.editingResponseId).toBeNull();
    expect(component.editingContent).toBe('');
  });

  it('should not save edit if no response is being edited', () => {
    spyOn(component.saveEdit, 'emit');
    component.editingResponseId = null;
    component.editingContent = 'Updated content';
    component.onSaveEdit();
    expect(component.saveEdit.emit).not.toHaveBeenCalled();
  });
});
