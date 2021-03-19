import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDragDropComponent } from './grid-drag-drop.component';

describe('GridDragDropComponent', () => {
  let component: GridDragDropComponent;
  let fixture: ComponentFixture<GridDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
