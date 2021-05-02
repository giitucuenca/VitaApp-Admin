import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditHelperComponent } from './form-edit-helper.component';

describe('FormEditHelperComponent', () => {
  let component: FormEditHelperComponent;
  let fixture: ComponentFixture<FormEditHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
