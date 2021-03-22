import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { SubcategoryGet } from 'src/app/controller/interfaces/subcategory_get.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() category: CategoryGet;
  @Input() subcategory: SubcategoryGet;
  constructor() { }

  ngOnInit(): void {
  }

}
