import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChartModule} from 'primeng/chart';
import {TabMenuModule} from 'primeng/tabmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { DragDropModule } from "@angular/cdk/drag-drop";

/**
 * * Aquí se importan los modelos locales a ser utilizados en el proyecto.
*/
import { AppRoutingModule } from './app.routing';

/*
 * * Modulos de firebase
*/

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
/**
 * * Aquí se importan los componentes a ser utilizados en el proyecto.
*/
import { LoginComponent } from './view/auth/login/login.component';
import { MainComponent } from './view/main/main/main.component';
import { LayoutComponent } from './view/layout/layout/layout.component';
import { BoardComponent } from './view/board/board/board.component';
import { GridDragDropComponent } from './view/board/grid-drag-drop/grid-drag-drop.component';


import { environment } from '../environments/environment';
import { UploadFormComponent } from './view/uploadFile/upload-form/upload-form.component';
import { UploadDetailsComponent } from './view/uploadFile/upload-details/upload-details.component';
import { UploadListComponent } from './view/uploadFile/upload-list/upload-list.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    MainComponent,
    BoardComponent,
    GridDragDropComponent,
    UploadFormComponent,
    UploadDetailsComponent,
    UploadListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    TabMenuModule,
    BreadcrumbModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
