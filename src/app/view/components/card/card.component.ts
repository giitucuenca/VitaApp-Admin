import { PictogramHelp } from 'src/app/controller/interfaces/pictogram-help.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Pictogram } from 'src/app/controller/interfaces/pictogram.interface';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category: Category;
  @Input() subcategory: Subcategory;
  @Input() pictogram: Pictogram;
  @Input() pictogramHelp: PictogramHelp;
  @Output() clickEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickContent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  clickedDelete(): void {
    this.clickDelete.emit(true);
  }

  clickedEdit(): void {
    this.clickEdit.emit(true);
  }

  clickedContent(): void {
    this.clickContent.emit(true);
  }
}
