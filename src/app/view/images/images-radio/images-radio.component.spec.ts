import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesRadioComponent } from './images-radio.component';

describe('ImagesRadioComponent', () => {
  let component: ImagesRadioComponent;
  let fixture: ComponentFixture<ImagesRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
