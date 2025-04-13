import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpathyStepComponent } from './empathy-step.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { EmpathyMapFacade } from 'src/app/stores/empathy-map-store/empathy-map.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { of } from 'rxjs';
import { ResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from 'src/app/common/common.module';
import { IResponse } from 'src/app/common/interfaces/response.interface';

describe('EmpathyStepComponent', () => {
  let component: EmpathyStepComponent;
  let fixture: ComponentFixture<EmpathyStepComponent>;
  let empathyMapFacade: jasmine.SpyObj<EmpathyMapFacade>;
  let userFacade: jasmine.SpyObj<UserFacade>;
  let store: jasmine.SpyObj<Store>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockUser = { id: '1', name: 'Test User' };
  const mockResponse: IResponse = {
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
  };

  beforeEach(async () => {
    const empathyMapFacadeSpy = jasmine.createSpyObj('EmpathyMapFacade', [
      'loadResponses',
      'createResponse',
      'upvoteResponse',
      'removeUpvoteResponse',
      'toggleResponseSelection',
      'updateResponse',
    ]);
    empathyMapFacadeSpy.responses$ = of([mockResponse]);
    empathyMapFacadeSpy.loading$ = of(false);
    empathyMapFacadeSpy.error$ = of(null);

    const userFacadeSpy = jasmine.createSpyObj('UserFacade', []);
    userFacadeSpy.user$ = of(mockUser);

    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [EmpathyStepComponent],
      imports: [CommonModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            parent: {
              snapshot: {
                params: {
                  projectId: '1',
                },
              },
            },
          },
        },
        { provide: EmpathyMapFacade, useValue: empathyMapFacadeSpy },
        { provide: UserFacade, useValue: userFacadeSpy },
        { provide: Store, useValue: storeSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    empathyMapFacade = TestBed.inject(
      EmpathyMapFacade
    ) as jasmine.SpyObj<EmpathyMapFacade>;
    userFacade = TestBed.inject(UserFacade) as jasmine.SpyObj<UserFacade>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpathyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load responses on init', () => {
    expect(empathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
  });

  it('should handle form submit', () => {
    const formData = {
      think: 'Test thought\nAnother thought',
      feel: 'Test feeling',
    };

    component.onFormSubmit(formData);

    expect(empathyMapFacade.createResponse).toHaveBeenCalledTimes(3);
    expect(snackBar.open).toHaveBeenCalledWith(
      '3 resposta(s) criada(s) com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should handle upvote response', () => {
    component.onUpvoteResponse(1, false);
    expect(empathyMapFacade.upvoteResponse).toHaveBeenCalledWith(1, 1);

    component.onUpvoteResponse(1, true);
    expect(empathyMapFacade.removeUpvoteResponse).toHaveBeenCalledWith(1, 1);
  });

  it('should handle toggle response selection', () => {
    component.onToggleResponseSelection(1);
    expect(empathyMapFacade.toggleResponseSelection).toHaveBeenCalledWith(1);
  });

  it('should handle delete response', () => {
    component.onDeleteResponse(1);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should handle edit response', () => {
    component.onEditResponse(mockResponse);
    // Implementation will be done in the list component
  });

  it('should handle save edit response', () => {
    const editData = { id: 1, content: 'Updated content' };
    component.onSaveEditResponse(editData);
    expect(empathyMapFacade.updateResponse).toHaveBeenCalledWith(
      1,
      1,
      'Updated content'
    );
  });

  it('should refresh data', () => {
    component.refreshData();
    expect(empathyMapFacade.loadResponses).toHaveBeenCalledWith(1, 1);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Dados atualizados com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should get responses by type', (done) => {
    component.getResponsesByType(ResponseType.THINK).subscribe((responses) => {
      expect(responses.length).toBe(1);
      expect(responses[0].type).toBe(ResponseType.THINK);
      done();
    });
  });

  it('should get type label', () => {
    expect(component.getTypeLabel(ResponseType.THINK)).toBe('Pensa');
    expect(component.getTypeLabel(ResponseType.FEEL)).toBe('Sente');
    expect(component.getTypeLabel(ResponseType.SAY)).toBe('Diz');
    expect(component.getTypeLabel(ResponseType.DO)).toBe('Faz');
    expect(component.getTypeLabel(ResponseType.PAINS)).toBe('Dores');
    expect(component.getTypeLabel(ResponseType.NEEDS)).toBe('Necessidades');
  });
});
