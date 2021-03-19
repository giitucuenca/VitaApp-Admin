import { Category } from './../../../controller/interfaces/category.interface';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { CategoryGet } from 'src/app/controller/interfaces/category_get.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  categories: CategoryGet[] = [];
  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas'];
  pageCurrent: string;
  @ViewChildren('pages') pages: QueryList<ElementRef<HTMLElement>>;

  constructor(private vitaapp: VitaappService) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenu[0];
    this.getAllCategories();
  }

  openPage(index: number): void {
    this.pages.forEach((page, i) => {
      if (index === i) {
        this.pageCurrent = this.subMenu[i];

        if (page.nativeElement.classList.contains('animate__bounceOut')) {
          page.nativeElement.classList.remove('animate__bounceOut');
          page.nativeElement.classList.add('animate__bounceIn');
        }
      } else {
        if (page.nativeElement.classList.contains('animate__bounceIn')) {
          page.nativeElement.classList.remove('animate__bounceIn');
          page.nativeElement.classList.add('animate__bounceOut');
        }
      }
    });
  }

  getAllCategories(): void {
    this.vitaapp.getAllCategories().subscribe(
      (resp) => {
        this.categories = resp;
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
