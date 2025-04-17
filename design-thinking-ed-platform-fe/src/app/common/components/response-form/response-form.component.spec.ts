import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '../../common.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Validators } from '@angular/forms';
import { ResponseFormComponent } from './response-form.component';

describe('ResponseFormComponent', () => {
  let component: ResponseFormComponent;
  let fixture: ComponentFixture<ResponseFormComponent>;

  const mockFields = [
    {
      key: 'field1',
      label: 'Field 1',
      placeholder: 'Enter field 1',
      required: true,
    },
    {
      key: 'field2',
      label: 'Field 2',
      placeholder: 'Enter field 2',
      required: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseFormComponent);
    component = fixture.componentInstance;
    component.fields = mockFields;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with fields', () => {
    expect(component.form.get('field1')).toBeTruthy();
    expect(component.form.get('field2')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const field1Control = component.form.get('field1');
    expect(field1Control?.hasValidator(Validators.required)).toBeTrue();

    const field2Control = component.form.get('field2');
    expect(field2Control?.hasValidator(Validators.required)).toBeFalse();
  });

  it('should emit form data on valid submit', () => {
    spyOn(component.submitForm, 'emit');

    component.form.patchValue({
      field1: 'Value 1\nValue 2',
      field2: 'Value 3',
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      field1: 'Value 1\nValue 2',
      field2: 'Value 3',
    });
    expect(component.form.value).toEqual({
      field1: '',
      field2: '',
    });
  });

  it('should not emit form data on invalid submit', () => {
    spyOn(component.submitForm, 'emit');

    component.form.patchValue({
      field1: '',
      field2: 'Value 3',
    });

    component.onSubmit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
    expect(component.form.value).toEqual({
      field1: '',
      field2: 'Value 3',
    });
  });

  it('should handle empty lines in form data', () => {
    spyOn(component.submitForm, 'emit');

    component.form.patchValue({
      field1: 'Value 1\n\nValue 2\n',
      field2: '\nValue 3\n\n',
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      field1: 'Value 1\nValue 2',
      field2: 'Value 3',
    });
  });
});
