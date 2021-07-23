import { FormEditPictogramComponent } from './../../forms/form-edit-pictogram/form-edit-pictogram.component';
import { Category } from './../../../controller/interfaces/category.interface';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormSubcategoryComponent } from '../../forms/form-subcategory/form-subcategory.component';
import { FormPictogramComponent } from '../../forms/form-pictogram/form-pictogram.component';
import { Pictogram } from 'src/app/controller/interfaces/pictogram.interface';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';
import { FormEditCategoryComponent } from '../../forms/form-edit-category/form-edit-category.component';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { FormEditSubcategoryComponent } from '../../forms/form-edit-subcategory/form-edit-subcategory.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  pictograms: Pictogram[] = [];
  skeletonCategories = [];
  skeletonPictograms = [];
  areTheAreCategories = false;
  areThereSubcategories = false;
  areTherePictograms = false;
  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas'];
  subMenuNavigation = ['Categorias'];
  pageCurrent: string;
  idCategory: number;
  idSubcategory: number;

  @ViewChildren('pages') pages: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('appSubcategory') appSubcategory: FormSubcategoryComponent;
  @ViewChild('appPictogram') appPictogram: FormPictogramComponent;
  @ViewChild('formEditCategory') formEditCategory: FormEditCategoryComponent;
  @ViewChild('formEditSubcategory')
  formEditSubcategory: FormEditSubcategoryComponent;
  @ViewChild('formEditPictogram')
  formEditPictogram: FormEditPictogramComponent;
  @ViewChild('collapsePanelCat') collapsePanelCat: CollapsePanelComponent;
  @ViewChild('collapsePanelSub') collapsePanelSub: CollapsePanelComponent;
  @ViewChild('collapsePanelPic') collapsePanelPic: CollapsePanelComponent;

  constructor(private vitaapp: VitaappService, private router: Router) {}

  ngOnInit(): void {
    // this.skeletonCategories = Array(6).fill('');
    // this.skeletonPictograms = Array(20).fill('');
    this.pageCurrent = this.subMenu[0];
    //this.getAllCategories();

    if (this.router.url === '/panel') {
      this.router.navigateByUrl('/panel/categorias');
    }
  }

  openPage(index: number, id: number): void {
    if (index === 1) {
      this.idCategory = id;
      this.appSubcategory.setCategoryId(id);
      this.getAllSubcategories(id);
    }

    if (index === 2) {
      this.idSubcategory = id;
      this.appPictogram.setSubcategoryId(id);
      this.getAllPictograms(id);
    }

    if (this.subMenuNavigation.length === index) {
      this.subMenuNavigation.push(this.subMenu[index]);
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
    this.areTheAreCategories = false;
    this.categories = [];
    this.vitaapp.getAllCategories().subscribe(
      (resp) => {
        this.areTheAreCategories = true;
        this.categories = resp;
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllSubcategories(idCategory: number): void {
    this.subcategories = [];
    this.areThereSubcategories = false;
    this.vitaapp
      .getAllSubcategoriesByCategoryId(idCategory)
      .subscribe((subcategories) => {
        console.log(subcategories);
        this.areThereSubcategories = true;
        this.subcategories = subcategories;
      });
  }

  getAllPictograms(idSubcategory: number): void {
    this.pictograms = [];
    this.areTherePictograms = false;
    this.vitaapp
      .getAllPictogramsBySubcategoryId(idSubcategory)
      .subscribe((pictograms) => {
        this.areTherePictograms = true;
        console.log(pictograms);
        this.pictograms = pictograms;
      });
  }

  goToPage(index: number) {
    const totalPages = this.subMenuNavigation.length;
    for (let i = index + 1; i < totalPages; i++) {
      this.subMenuNavigation.splice(index + 1, 1);
    }

    if (index === 0) {
      this.openPage(index, -1);
    } else if (index === 1) {
      this.openPage(index, this.idCategory);
    } else if (index === 2) {
      this.openPage(index, this.idSubcategory);
    }
  }

  editCategory(category: Category): void {
    this.collapsePanelCat.openPanel();
    this.formEditCategory.categoryToEdit(category);
  }

  collapsePanelCatAndReload(): void {
    this.collapsePanelCat.closePanel();
    this.getAllCategories();
  }

  editSubcategory(subcategory: Subcategory): void {
    this.collapsePanelSub.openPanel();
    this.formEditSubcategory.subcategoryToEdit(subcategory);
  }

  editPictogram(pictogram: Pictogram): void {
    this.collapsePanelPic.openPanel();
    this.formEditPictogram.pictogramToEdit(pictogram);
  }

  collapsePanelSubAndReload(idSubcategory: number): void {
    this.collapsePanelSub.closePanel();
    this.getAllSubcategories(idSubcategory);
  }

  collapsePanelPicAndReload(idSubcategory: number): void {
    this.collapsePanelPic.closePanel();
    this.getAllPictograms(idSubcategory);
  }

  collapseEditSubcategory(): void {
    this.collapsePanelSub.closePanel();
  }

  collapseEditCategory(): void {
    this.collapsePanelCat.closePanel();
  }

  collapseEditPictogram(): void {
    this.collapsePanelPic.closePanel();
  }
}
