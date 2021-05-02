import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditSubcategoryComponent } from './form-edit-subcategory.component';

describe('FormEditSubcategoryComponent', () => {
  let component: FormEditSubcategoryComponent;
  let fixture: ComponentFixture<FormEditSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
