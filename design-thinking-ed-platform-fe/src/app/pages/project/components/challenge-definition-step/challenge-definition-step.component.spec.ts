import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeDefinitionStepComponent } from './challenge-definition-step.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ChallengeDefinitionFacade } from '../../../../stores/challenge-definition-store/challenge-definition.facade';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { ResponseType } from '../../../../common/interfaces/challenge-definition-response.interface';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IUser } from '../../../../common/interfaces/user.interface';
import { UserTypeEnum } from '../../../../common/enum/user.enum';
import { ProjectSteps } from '../../../../common/enum/class.enum';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('ChallengeDefinitionStepComponent', () => {
  let component: ChallengeDefinitionStepComponent;
  let fixture: ComponentFixture<ChallengeDefinitionStepComponent>;
  let mockChallengeDefinitionFacade: jasmine.SpyObj<ChallengeDefinitionFacade>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockChallengeDefinitionFacade = jasmine.createSpyObj(
      'ChallengeDefinitionFacade',
      [
        'loadResponses',
        'createResponse',
        'upvoteResponse',
        'removeVote',
        'toggleResponseSelection',
        'deleteResponse',
        'updateResponse',
        'getResponsesByType',
      ],
      {
        loading$: of(false),
        error$: of(null),
      }
    );

    mockUserFacade = jasmine.createSpyObj('UserFacade', ['user$']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    mockChallengeDefinitionFacade.getResponsesByType.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ChallengeDefinitionStepComponent],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: ChallengeDefinitionFacade,
          useValue: mockChallengeDefinitionFacade,
        },
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Store, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ projectId: '1' }),
            parent: {
              snapshot: {
                params: { projectId: '1' },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeDefinitionStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms', () => {
    expect(component.problemsForm).toBeTruthy();
    expect(component.targetAudienceForm).toBeTruthy();
    expect(component.howWeCanForm).toBeTruthy();
    expect(component.brainstormForm).toBeTruthy();
  });

  it('should load responses on init', () => {
    const mockUser: IUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      userType: UserTypeEnum.STUDENT,
      group: { id: '1', groupName: 'Test Group' },
      studentClass: {
        id: '1',
        className: 'Test Class',
        invitedStudents: [],
        semester: '2025.1',
        professor: { id: 1 },
        projectStep: ProjectSteps.Empatia,
        groups: [],
      },
      password: 'password',
    };
    mockUserFacade.user$ = of(mockUser);
    mockChallengeDefinitionFacade.getResponsesByType.and.returnValue(of([]));
    mockChallengeDefinitionFacade.loading$ = of(false);
    mockChallengeDefinitionFacade.error$ = of(null);

    fixture.detectChanges();

    expect(mockChallengeDefinitionFacade.loadResponses).toHaveBeenCalledWith(
      1,
      1
    );
  });

  it('should handle form submission', () => {
    const testContent = 'Test content\nAnother line';
    component.problemsForm.setValue({ content: testContent });
    component.projectId = 1;
    component.currentUserId = 1;

    component.onSubmit(ResponseType.PROBLEMS);

    expect(mockChallengeDefinitionFacade.createResponse).toHaveBeenCalledTimes(
      2
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      '2 resposta(s) criada(s) com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should handle upvote', () => {
    const mockResponse = { id: 1, hasVoted: false } as any;
    component.currentUserId = 1;

    component.onUpvote(mockResponse);
    expect(mockChallengeDefinitionFacade.upvoteResponse).toHaveBeenCalledWith(
      1,
      1
    );

    mockResponse.hasVoted = true;
    component.onUpvote(mockResponse);
    expect(mockChallengeDefinitionFacade.removeVote).toHaveBeenCalledWith(1, 1);
  });

  it('should handle response deletion', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockResponse = { id: 1 } as any;
    component.currentUserId = 1;

    component.onDelete(mockResponse);
    expect(mockChallengeDefinitionFacade.deleteResponse).toHaveBeenCalledWith(
      1,
      1
    );
  });

  it('should handle response editing', () => {
    const mockResponse = { id: 1, content: 'Test content' } as any;

    component.startEditing(mockResponse);
    expect(component.editingResponseId).toBe(1);
    expect(component.editingContent).toBe('Test content');

    component.cancelEditing();
    expect(component.editingResponseId).toBeNull();
    expect(component.editingContent).toBe('');

    component.startEditing(mockResponse);
    component.editingContent = 'Updated content';
    component.currentUserId = 1;
    component.saveEdit();
    expect(mockChallengeDefinitionFacade.updateResponse).toHaveBeenCalledWith(
      1,
      'Updated content',
      1
    );
  });

  it('should refresh data', () => {
    component.projectId = 1;
    component.currentUserId = 1;

    component.refreshData();
    expect(mockChallengeDefinitionFacade.loadResponses).toHaveBeenCalledWith(
      1,
      1
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Dados atualizados com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });
});
