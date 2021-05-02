import { CollapsePanelComponent } from './../../components/collapse-panel/collapse-panel.component';
import { FormPictogramComponent } from './../../forms/form-pictogram/form-pictogram.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PictogramHelp } from 'src/app/controller/interfaces/pictogram-help.interface';
import { FormHelperComponent } from '../../forms/form-helper/form-helper.component';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormEditHelperComponent } from '../../forms/form-edit-helper/form-edit-helper.component';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss'],
})
export class HelpersComponent implements OnInit {
  pictograms: PictogramHelp[] = [];
  skeletonPictograms = [];
  areTherePictograms = false;
  @ViewChild('appPictogram') appPictogram: FormHelperComponent;
  @ViewChild('collapsePanelPic') collapsePanelPic: CollapsePanelComponent;
  @ViewChild('formEditPictogram')
  formEditPictogram: FormEditHelperComponent;
  pictogramId: number = -1;
  constructor(
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.skeletonPictograms = Array(20).fill('');
    this.getAllPictograms();
    this.primengConfig.ripple = true;
  }

  getAllPictograms(): void {
    this.pictograms = [];
    this.areTherePictograms = false;
    this.vitaapp.getAllPictogramsHelp().subscribe((pictograms) => {
      this.areTherePictograms = true;
      console.log(pictograms);
      this.pictograms = pictograms;
    });
  }

  editPictogram(pictogram: PictogramHelp): void {
    this.collapsePanelPic.openPanel();
    this.formEditPictogram.pictogramToEdit(pictogram);
  }

  collapsePanelPicAndReload(): void {
    this.collapsePanelPic.closePanel();
    this.getAllPictograms();
  }

  collapseEditPictogram(): void {
    this.collapsePanelPic.closePanel();
  }

  deletePictogram(pictogramId: number): void {
    this.pictogramId = pictogramId;
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar el pictograma, recuerde que se efectuara un eliminado lógico.',
      header: 'Quiere Eliminar el Pictograma',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deletePictogramHelp(pictogramId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino el pictograma.',
            };
            this.showMessage(msg);
            this.getAllPictograms();
          },
          (err) => {
            const msg = {
              severity: 'error',
              summary: 'Error',
              detail: err.message,
            };
            this.showMessage(msg);
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

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastHelper',
      ...msg,
    });
  }
}
