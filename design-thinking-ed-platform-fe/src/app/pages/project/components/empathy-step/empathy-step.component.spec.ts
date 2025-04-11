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
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import * as EmpathyMapActions from 'src/app/stores/empathy-map-store/empathy-map.actions';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from 'src/app/common/common.module';

describe('EmpathyStepComponent', () => {
  let component: EmpathyStepComponent;
  let fixture: ComponentFixture<EmpathyStepComponent>;
  let mockEmpathyMapFacade: jasmine.SpyObj<EmpathyMapFacade>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockActivatedRoute: any;

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

  const mockResponse: EmpathyMapResponse = {
    id: 1,
    content: 'Test content',
    userId: 1,
    type: ResponseType.THINK,
    projectId: 1,
    upvotes: 0,
    hasVoted: false,
    isSelected: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockEmpathyMapFacade = jasmine.createSpyObj('EmpathyMapFacade', [
      'loadResponses',
      'createResponse',
      'updateResponse',
      'deleteResponse',
      'upvoteResponse',
      'removeUpvoteResponse',
      'toggleResponseSelection',
    ]);

    mockUserFacade = jasmine.createSpyObj('UserFacade', ['user$']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockActivatedRoute = {
      params: of({}),
      parent: {
        snapshot: {
          params: { projectId: '1' },
        },
      },
    };

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
        CommonModule,
      ],
      providers: [
        { provide: EmpathyMapFacade, useValue: mockEmpathyMapFacade },
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: Store, useValue: mockStore },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockUserFacade.user$ = of(mockUser);
    mockEmpathyMapFacade.responses$ = of([mockResponse]);
    mockEmpathyMapFacade.loading$ = of(false);
    mockEmpathyMapFacade.error$ = of(null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpathyStepComponent);
    component = fixture.componentInstance;
    component.projectId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct form fields', () => {
    expect(component.formFields).toEqual([
      {
        key: 'think',
        label: 'Pensa',
        placeholder: 'O que o usuário pensa?',
        required: true,
      },
      {
        key: 'feel',
        label: 'Sente',
        placeholder: 'O que o usuário sente?',
        required: true,
      },
      {
        key: 'say',
        label: 'Diz',
        placeholder: 'O que o usuário diz?',
        required: true,
      },
      {
        key: 'do',
        label: 'Faz',
        placeholder: 'O que o usuário faz?',
        required: true,
      },
      {
        key: 'pains',
        label: 'Dores',
        placeholder: 'Quais são as dores do usuário?',
        required: true,
      },
      {
        key: 'needs',
        label: 'Necessidades',
        placeholder: 'Quais são as necessidades do usuário?',
        required: true,
      },
    ]);
  });

  it('should handle form submission', () => {
    const formData = {
      think: 'Test think\nAnother think',
      feel: 'Test feel',
      say: 'Test say',
      do: 'Test do',
      pains: 'Test pains',
      needs: 'Test needs',
    };

    component.onFormSubmit(formData);

    expect(mockEmpathyMapFacade.createResponse).toHaveBeenCalledTimes(7);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      '7 resposta(s) criada(s) com sucesso!',
      'Fechar',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      }
    );
  });

  it('should handle upvote response', () => {
    component.onUpvoteResponse(1, false);
    expect(mockEmpathyMapFacade.upvoteResponse).toHaveBeenCalledWith(1, 1);

    component.onUpvoteResponse(1, true);
    expect(mockEmpathyMapFacade.removeUpvoteResponse).toHaveBeenCalledWith(
      1,
      1
    );
  });

  it('should handle toggle response selection', () => {
    component.onToggleResponseSelection(1);
    expect(mockEmpathyMapFacade.toggleResponseSelection).toHaveBeenCalledWith(
      1
    );
  });

  it('should handle delete response', () => {
    component.onDeleteResponse(1);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should handle edit response', () => {
    component.onEditResponse(mockResponse);
    // A implementação real está no componente de lista
  });

  it('should handle save edit response', () => {
    component.onSaveEditResponse({ id: 1, content: 'Updated content' });
    expect(mockEmpathyMapFacade.updateResponse).toHaveBeenCalledWith(
      1,
      1,
      'Updated content'
    );
  });

  it('should refresh data', () => {
    component.refreshData();
    expect(mockEmpathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Dados atualizados com sucesso!',
      'Fechar',
      {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      }
    );
  });

  it('should initialize component with correct data', () => {
    expect(component.projectId).toBe(1);
    expect(component.currentUserId).toBe(1);
    expect(mockEmpathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
  });

  it('should handle error when loading responses', () => {
    const error = new Error('Test error');
    mockEmpathyMapFacade.error$ = of(error);
    spyOn(console, 'error');

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(
      'Error loading empathy map:',
      error
    );
  });

  it('should not submit form when projectId is null', () => {
    component.projectId = null;
    const formData = {
      think: 'Test think',
      feel: 'Test feel',
      say: 'Test say',
      do: 'Test do',
      pains: 'Test pains',
      needs: 'Test needs',
    };

    component.onFormSubmit(formData);
    expect(mockEmpathyMapFacade.createResponse).not.toHaveBeenCalled();
  });

  it('should handle empty form submission', () => {
    const formData = {
      think: '',
      feel: '',
      say: '',
      do: '',
      pains: '',
      needs: '',
    };

    component.onFormSubmit(formData);
    expect(mockEmpathyMapFacade.createResponse).not.toHaveBeenCalled();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
  });

  it('should handle isCurrentUser$ observable', () => {
    const testUserId = 1;
    component.isCurrentUser$(testUserId).subscribe((isCurrent) => {
      expect(isCurrent).toBe(true);
    });

    const differentUserId = 2;
    component.isCurrentUser$(differentUserId).subscribe((isCurrent) => {
      expect(isCurrent).toBe(false);
    });
  });

  it('should handle error in form submission', () => {
    const formData = {
      think: 'Test think',
      feel: 'Test feel',
      say: 'Test say',
      do: 'Test do',
      pains: 'Test pains',
      needs: 'Test needs',
    };

    mockEmpathyMapFacade.createResponse.and.throwError('Test error');

    expect(() => {
      component.onFormSubmit(formData);
    }).not.toThrow();
  });
});
