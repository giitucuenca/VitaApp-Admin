import { ActivatedRoute, Router } from '@angular/router';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormEditSubcategoryComponent } from '../../forms/form-edit-subcategory/form-edit-subcategory.component';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { FormSubcategoryComponent } from '../../forms/form-subcategory/form-subcategory.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-crud-subcategories',
  templateUrl: './crud-subcategories.component.html',
  styleUrls: ['./crud-subcategories.component.scss'],
})
export class CrudSubcategoriesComponent implements OnInit {
  subcategories: Subcategory[] = [];
  areThereSubcategories = false;
  idCategory: number;
  skeletonCategories = [];
  @ViewChild('appSubcategory') appSubcategory: FormSubcategoryComponent;
  @ViewChild('formEditSubcategory')
  formEditSubcategory: FormEditSubcategoryComponent;
  @ViewChild('collapsePanelSub') collapsePanelSub: CollapsePanelComponent;

  subMenuNavigation = ['Categorias', 'Subcategoria'];
  pageCurrent: string;
  constructor(
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenuNavigation[1];
    this.skeletonCategories = Array(6).fill('');
    this.activeRoute.params.subscribe((params) => {
      this.idCategory = params['id'];
      this.getAllSubcategories(this.idCategory);
    });
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

  editSubcategory(subcategory: Subcategory): void {
    this.collapsePanelSub.openPanel();
    this.formEditSubcategory.subcategoryToEdit(subcategory);
  }

  deleteSubcategory(subcategory: Subcategory) {
    console.log(this.confirmationService);
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar la subcategoría, recuerde que se efectuara un eliminado lógico.',
      header: 'Quiere Eliminar la Subcategoría',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteSubcategory(subcategory).subscribe(
          () => {
            this.showMessage({
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se eliminó la subcategoría',
            });
            this.getAllSubcategories(this.idCategory);
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

  collapsePanelSubAndReload(idCategory: number): void {
    this.collapsePanelSub.closePanel();
    this.getAllSubcategories(idCategory);
  }

  collapseEditSubcategory(): void {
    this.collapsePanelSub.closePanel();
  }

  openPictograms(subcategoryId: number): void {
    this.router.navigate(['/panel/pictogramas', subcategoryId]);
  }

  goToCategories(index: number): void {
    if (index == 0) {
      this.router.navigateByUrl('/panel/categorias');
    }
  }

  addCategoryId(): void {
    this.appSubcategory.setCategoryId(this.idCategory);
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastHelper',
      ...msg,
    });
  }
}
