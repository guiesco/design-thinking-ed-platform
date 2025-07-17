import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ClassDetailsComponent } from './class-details.component';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { IClass } from 'src/app/common/interfaces/class.interface';
import { IUser } from 'src/app/common/interfaces/user.interface';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';

describe('ClassDetailsComponent', () => {
  let component: ClassDetailsComponent;
  let fixture: ComponentFixture<ClassDetailsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockClassFacade: jasmine.SpyObj<ClassFacade>;
  let mockGroupFacade: jasmine.SpyObj<GroupFacade>;
  let mockUserFacade: jasmine.SpyObj<UserFacade>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockUser: IUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    userType: UserTypeEnum.PROFESSOR,
    group: {},
    studentClass: {
      id: '1',
      className: 'Test Class',
      semester: '2024.1',
      invitedStudents: [],
      professor: {} as IUser,
      groups: [],
    },
  };

  const mockClass: IClass = {
    id: '1',
    className: 'Test Class',
    semester: '2024.1',
    invitedStudents: ['student1@example.com', 'student2@example.com'],
    professor: mockUser,
    groups: [],
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ classId: '1' }),
    });
    mockClassFacade = jasmine.createSpyObj('ClassFacade', ['deleteClass'], {
      classes$: of([mockClass]),
    });
    mockGroupFacade = jasmine.createSpyObj('GroupFacade', ['loadGroups'], {
      groups$: of([]),
    });
    mockUserFacade = jasmine.createSpyObj('UserFacade', [], {
      user$: of(mockUser),
    });
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ClassDetailsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ClassFacade, useValue: mockClassFacade },
        { provide: GroupFacade, useValue: mockGroupFacade },
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with class data', () => {
    fixture.detectChanges();
    expect(component.classData).toEqual(mockClass);
    expect(component.classId).toBe('1');
    expect(component.currentUserId).toBe(1);
  });

  it('should load groups on initialization', () => {
    fixture.detectChanges();
    expect(mockGroupFacade.loadGroups).toHaveBeenCalledWith('1', 0, 50);
  });

  it('should navigate back to class list', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/class']);
  });

  it('should parse project step correctly', () => {
    const result = component.parseProjectStep(0);
    expect(result).toBeDefined();
  });

  it('should parse group names correctly', () => {
    const groups = [
      { id: '1', groupName: 'Group 1', students: [], class: {} },
      { id: '2', groupName: 'Group 2', students: [], class: {} },
    ];
    const result = component.parseGroupName(groups);
    expect(result).toEqual(['Group 1', 'Group 2']);
  });

  it('should return empty array for students without group', () => {
    const result = component.getStudentsWithoutGroup();
    expect(result).toEqual([]);
  });

  it('should handle error when class not found', () => {
    mockClassFacade.classes$ = of([]);
    fixture.detectChanges();
    expect(component.error).toBe('Turma não encontrada');
  });
});
