import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditCategoryComponent } from './form-edit-category.component';

describe('FormEditCategoryComponent', () => {
  let component: FormEditCategoryComponent;
  let fixture: ComponentFixture<FormEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
