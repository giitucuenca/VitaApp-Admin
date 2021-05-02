import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPictogramsComponent } from './crud-pictograms.component';

describe('CrudPictogramsComponent', () => {
  let component: CrudPictogramsComponent;
  let fixture: ComponentFixture<CrudPictogramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPictogramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPictogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
