import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPictogramComponent } from './form-edit-pictogram.component';

describe('FormEditPictogramComponent', () => {
  let component: FormEditPictogramComponent;
  let fixture: ComponentFixture<FormEditPictogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditPictogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditPictogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
