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
import { FormSubcategoryComponent } from '../../forms/form-subcategory/form-subcategory.component';
import { SubcategoryGet } from 'src/app/controller/interfaces/subcategory_get.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  categories: CategoryGet[] = [];
  subcategories: SubcategoryGet[] = [];
  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas'];
  subMenuNavigation = ['Categorias'];
  pageCurrent: string;
  subcategoryCurrent: number;
  @ViewChild('appSubcategory') appSubcategory: FormSubcategoryComponent;

  idToOpen: number = -1;
  @ViewChildren('pages') pages: QueryList<ElementRef<HTMLElement>>;

  constructor(private vitaapp: VitaappService) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenu[0];
    this.getAllCategories();
  }

  openPage(index: number, id: number): void {
    this.idToOpen = id;

    if(index === 1) {
      this.appSubcategory.setCategoryId(id);
      this.getAllSubcategories(id);
      this.subcategoryCurrent = id;
    }

    if(this.subMenuNavigation.length === index) {
      this.subMenuNavigation.push(this.subMenu[index])
    }
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

  getAllSubcategories(idCategory: number): void {
    this.vitaapp.getAllSubcategoriesByCategoryId(idCategory).subscribe(
      subcategories => {
        debugger
        this.subcategories = subcategories;
      }
    )
  }

  goToPage(index: number) {
    for (let i = index + 1; i < this.subMenuNavigation.length; i++) {
      this.subMenuNavigation.splice(index + 1, 1);
    }
    this.openPage(index, this.idToOpen);
  }
}
