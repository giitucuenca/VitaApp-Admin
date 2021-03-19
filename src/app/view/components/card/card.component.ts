import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/controller/interfaces/category.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() category: CategoryGet;
  constructor() { }

  ngOnInit(): void {
  }

}
