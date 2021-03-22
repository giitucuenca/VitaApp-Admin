import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPictogramComponent } from './form-pictogram.component';

describe('FormPictogramComponent', () => {
  let component: FormPictogramComponent;
  let fixture: ComponentFixture<FormPictogramComponent>;

  beforeEach(waitForAsync(() => {
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
