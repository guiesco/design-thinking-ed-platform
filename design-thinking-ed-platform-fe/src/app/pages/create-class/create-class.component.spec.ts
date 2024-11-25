import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassComponent } from './create-class.component';

describe('CreateClassComponent', () => {
  let component: CreateClassComponent;
  let fixture: ComponentFixture<CreateClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClassComponent]
    });
    fixture = TestBed.createComponent(CreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
