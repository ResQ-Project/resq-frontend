import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfFormFieldComponent } from './half-form-field.component';

describe('HalfFormFieldComponent', () => {
  let component: HalfFormFieldComponent;
  let fixture: ComponentFixture<HalfFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
