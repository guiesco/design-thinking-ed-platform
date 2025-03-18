import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpathyStepComponent } from './empathy-step.component';

describe('EmpathyStepComponent', () => {
  let component: EmpathyStepComponent;
  let fixture: ComponentFixture<EmpathyStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpathyStepComponent]
    });
    fixture = TestBed.createComponent(EmpathyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
