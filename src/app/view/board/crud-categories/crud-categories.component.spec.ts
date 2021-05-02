import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCategoriesComponent } from './crud-categories.component';

describe('CrudCategoriesComponent', () => {
  let component: CrudCategoriesComponent;
  let fixture: ComponentFixture<CrudCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
