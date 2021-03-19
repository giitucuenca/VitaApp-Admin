import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPictogramComponent } from './form-pictogram.component';

describe('FormPictogramComponent', () => {
  let component: FormPictogramComponent;
  let fixture: ComponentFixture<FormPictogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPictogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPictogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
