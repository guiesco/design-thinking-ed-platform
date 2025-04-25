import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { InfoDisplayComponent } from './info-display.component';

describe('InfoDisplayComponent', () => {
  let component: InfoDisplayComponent;
  let fixture: ComponentFixture<InfoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoDisplayComponent],
      imports: [MatListModule, MatDividerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process input data correctly', () => {
    component.dataObject = {
      name: 'Test Name',
      tags: ['tag1', 'tag2', 'tag3'],
      amount: 123,
    };
    component.ngOnChanges({
      dataObject: { currentValue: component.dataObject, firstChange: true },
    } as any);

    expect(component.displayData.length).toBe(3);
    expect(component.displayData[0].key).toBe('name');
    expect(component.displayData[1].key).toBe('tags');
    expect(component.displayData[1].isArray).toBe(true);
    expect(component.displayData[2].key).toBe('amount');
  });

  it('should format keys correctly', () => {
    expect(component.getDisplayKey('userName')).toBe('User Name');
    expect(component.getDisplayKey('productFamily')).toBe('Product Family');
  });

  it('should use provided key labels', () => {
    component.keyLabels = {
      userName: 'Nome de Usuário',
      productId: 'ID do Produto',
    };
    expect(component.getDisplayKey('userName')).toBe('Nome de Usuário');
    expect(component.getDisplayKey('productId')).toBe('ID do Produto');
    expect(component.getDisplayKey('otherKey')).toBe('Other Key');
  });
});
