import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSubcategoriesComponent } from './crud-subcategories.component';

describe('CrudSubcategoriesComponent', () => {
  let component: CrudSubcategoriesComponent;
  let fixture: ComponentFixture<CrudSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudSubcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
