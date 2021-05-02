import { FormPictogramComponent } from './../../forms/form-pictogram/form-pictogram.component';
import { FormEditPictogramComponent } from './../../forms/form-edit-pictogram/form-edit-pictogram.component';
import { Pictogram } from 'src/app/controller/interfaces/pictogram.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-pictograms',
  templateUrl: './crud-pictograms.component.html',
  styleUrls: ['./crud-pictograms.component.scss'],
})
export class CrudPictogramsComponent implements OnInit {
  pictograms: Pictogram[] = [];
  skeletonPictograms = [];
  areTherePictograms = false;
  idSubcategory: number;
  @ViewChild('appPictogram') appPictogram: FormPictogramComponent;
  @ViewChild('formEditPictogram')
  formEditPictogram: FormEditPictogramComponent;
  @ViewChild('collapsePanelPic') collapsePanelPic: CollapsePanelComponent;

  constructor(
    private vitaapp: VitaappService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.idSubcategory = params['id'];
      this.getAllPictograms(this.idSubcategory);
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

  editPictogram(pictogram: Pictogram): void {
    this.collapsePanelPic.openPanel();
    this.formEditPictogram.pictogramToEdit(pictogram);
  }

  collapsePanelPicAndReload(idSubcategory: number): void {
    this.collapsePanelPic.closePanel();
    this.getAllPictograms(idSubcategory);
  }

  collapseEditPictogram(): void {
    this.collapsePanelPic.closePanel();
  }
}
