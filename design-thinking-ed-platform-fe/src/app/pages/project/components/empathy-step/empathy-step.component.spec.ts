import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpathyStepComponent } from './empathy-step.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { EmpathyMapFacade } from 'src/app/stores/empathy-map-store/empathy-map.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { of } from 'rxjs';
import {
  ResponseType,
  EmpathyMapResponse,
} from 'src/app/stores/empathy-map-store/empathy-map.service';
import { IUser } from 'src/app/common/interfaces/user.interface';
import * as EmpathyMapActions from 'src/app/stores/empathy-map-store/empathy-map.actions';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

describe('EmpathyStepComponent', () => {
  let component: EmpathyStepComponent;
  let fixture: ComponentFixture<EmpathyStepComponent>;
  let mockEmpathyMapFacade: jasmine.SpyObj<EmpathyMapFacade>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockEmpathyMapFacade = jasmine.createSpyObj(
      'EmpathyMapFacade',
      [
        'loadResponses',
        'createResponse',
        'upvoteResponse',
        'removeUpvoteResponse',
        'toggleResponseSelection',
        'deleteResponse',
        'updateResponse',
        'getResponsesByType',
      ],
      {
        entries$: of([]),
        responses$: of([]),
        loading$: of(false),
        error$: of(null),
      }
    );

    mockUserFacade = jasmine.createSpyObj('UserFacade', ['user$']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    mockEmpathyMapFacade.getResponsesByType.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [EmpathyStepComponent],
      imports: [
        MatTableModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
      ],
      providers: [
        { provide: EmpathyMapFacade, useValue: mockEmpathyMapFacade },
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
                paramMap: {
                  get: (key: string) => '1',
                },
              },
              paramMap: of({
                get: (key: string) => '1',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpathyStepComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.newEntry).toEqual({
      think: '',
      feel: '',
      say: '',
      do: '',
      pains: '',
      needs: '',
    });
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

    fixture.detectChanges();

    expect(mockEmpathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
  });

  it('should handle form submission', () => {
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
    component.newEntry = {
      think: 'Test think\nAnother think',
      feel: 'Test feel',
      say: '',
      do: '',
      pains: '',
      needs: '',
    };
    component.projectId = 1;

    component.onSubmit();

    expect(mockEmpathyMapFacade.createResponse).toHaveBeenCalledTimes(3);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      '3 resposta(s) criada(s) com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should handle upvote response', () => {
    component.currentUserId = 1;

    component.onUpvoteResponse(1, false);
    expect(mockEmpathyMapFacade.upvoteResponse).toHaveBeenCalledWith(1, 1);

    component.onUpvoteResponse(1, true);
    expect(mockEmpathyMapFacade.removeUpvoteResponse).toHaveBeenCalledWith(
      1,
      1
    );
  });

  it('should handle response selection toggle', () => {
    component.onToggleResponseSelection(1);
    expect(mockEmpathyMapFacade.toggleResponseSelection).toHaveBeenCalledWith(
      1
    );
  });

  it('should handle response deletion', () => {
    component.currentUserId = 1;
    component.onDeleteResponse(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      EmpathyMapActions.deleteResponse({ id: 1, userId: 1 })
    );
  });

  it('should handle response editing', () => {
    const mockResponse: EmpathyMapResponse = {
      id: 1,
      content: 'Test content',
      type: ResponseType.THINK,
      userId: 1,
      projectId: 1,
      upvotes: 0,
      hasVoted: false,
      isSelected: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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
    expect(mockEmpathyMapFacade.updateResponse).toHaveBeenCalledWith(
      1,
      1,
      'Updated content'
    );
  });

  it('should refresh data', () => {
    component.projectId = 1;
    component.currentUserId = 1;

    component.refreshData();
    expect(mockEmpathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Dados atualizados com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should get responses by type', () => {
    const mockResponses: EmpathyMapResponse[] = [
      {
        id: 1,
        content: 'Test',
        type: ResponseType.THINK,
        userId: 1,
        projectId: 1,
        upvotes: 0,
        hasVoted: false,
        isSelected: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockEmpathyMapFacade.getResponsesByType.and.returnValue(of(mockResponses));

    component.getResponsesByType(ResponseType.THINK).subscribe((responses) => {
      expect(responses).toEqual(mockResponses);
    });
  });
});
