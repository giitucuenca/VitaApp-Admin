import { CollapsePanelComponent } from './../../components/collapse-panel/collapse-panel.component';
import { FormEditCategoryComponent } from './../../forms/form-edit-category/form-edit-category.component';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

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

  constructor(
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

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

  deleteCategory(category: Category) {
    console.log(this.confirmationService);
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar la categoría, recuerde que se efectuara un eliminado lógico.',
      header: 'Quiere Eliminar la Categoría',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteCategory(category).subscribe(
          () => {
            this.showMessage({
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se eliminó la categoría',
            });
            this.getAllCategories();
          },
          (e) => {
            this.showMessage({
              severity: 'error',
              summary: 'Error',
              detail: e.message,
            });
          }
        );
      },
      reject: () => {
        const msg = {
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Se canceló el eliminado.',
        };
        this.showMessage(msg);
      },
      key: 'positionDialog',
    });
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

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastHelper',
      ...msg,
    });
  }
}
