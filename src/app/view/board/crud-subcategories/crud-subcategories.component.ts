import { ActivatedRoute, Router } from '@angular/router';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormEditSubcategoryComponent } from '../../forms/form-edit-subcategory/form-edit-subcategory.component';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { FormSubcategoryComponent } from '../../forms/form-subcategory/form-subcategory.component';

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

  constructor(
    private vitaapp: VitaappService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  collapsePanelSubAndReload(idSubcategory: number): void {
    this.collapsePanelSub.closePanel();
    this.getAllSubcategories(idSubcategory);
  }

  collapseEditSubcategory(): void {
    this.collapsePanelSub.closePanel();
  }

  openPictograms(subcategoryId: number): void {
    this.router.navigate(['/panel/pictogramas', subcategoryId]);
  }
}
