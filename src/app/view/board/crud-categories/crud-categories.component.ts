import { CollapsePanelComponent } from './../../components/collapse-panel/collapse-panel.component';
import { FormEditCategoryComponent } from './../../forms/form-edit-category/form-edit-category.component';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-categories',
  templateUrl: './crud-categories.component.html',
  styleUrls: ['./crud-categories.component.scss'],
})
export class CrudCategoriesComponent implements OnInit {
  categories: Category[] = [];
  skeletonCategories = [];
  areTheAreCategories = false;
  @ViewChild('formEditCategory') formEditCategory: FormEditCategoryComponent;
  @ViewChild('collapsePanelCat') collapsePanelCat: CollapsePanelComponent;
  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas'];
  subMenuNavigation = ['Categorias'];
  pageCurrent: string;

  constructor(private vitaapp: VitaappService, private router: Router) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenu[0];
    this.skeletonCategories = Array(6).fill('');
    this.getAllCategories();
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

  editCategory(category: Category): void {
    this.collapsePanelCat.openPanel();
    this.formEditCategory.categoryToEdit(category);
  }

  collapsePanelCatAndReload(): void {
    this.collapsePanelCat.closePanel();
    this.getAllCategories();
  }

  collapseEditCategory(): void {
    this.collapsePanelCat.closePanel();
  }

  openSubcategory(categoryId: number): void {
    this.router.navigate(['/panel/subcategorias', categoryId]);
  }
}
