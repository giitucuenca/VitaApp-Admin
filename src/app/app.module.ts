import { CollapsePanelComponent } from './view/components/collapse-panel/collapse-panel.component';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { TabMenuModule } from 'primeng/tabmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SkeletonModule } from 'primeng/skeleton';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';

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
import { FormCategoryComponent } from './view/forms/form-category/form-category.component';
import { FormSubcategoryComponent } from './view/forms/form-subcategory/form-subcategory.component';
import { FormPictogramComponent } from './view/forms/form-pictogram/form-pictogram.component';
import { CardComponent } from './view/components/card/card.component';
import { SkeletonCardComponent } from './view/layout/skeleton-card/skeleton-card.component';
import { ImagesRadioComponent } from './view/images/images-radio/images-radio.component';
import { FormEditCategoryComponent } from './view/forms/form-edit-category/form-edit-category.component';
import { FormEditSubcategoryComponent } from './view/forms/form-edit-subcategory/form-edit-subcategory.component';
import { FormEditPictogramComponent } from './view/forms/form-edit-pictogram/form-edit-pictogram.component';
import { HelpersComponent } from './view/helpers/helpers/helpers.component';
import { FormHelperComponent } from './view/forms/form-helper/form-helper.component';
import { FormEditHelperComponent } from './view/forms/form-edit-helper/form-edit-helper.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CrudCategoriesComponent } from './view/board/crud-categories/crud-categories.component';
import { CrudSubcategoriesComponent } from './view/board/crud-subcategories/crud-subcategories.component';
import { CrudPictogramsComponent } from './view/board/crud-pictograms/crud-pictograms.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    MainComponent,
    BoardComponent,
    GridDragDropComponent,
    UploadFormComponent,
    FormCategoryComponent,
    FormSubcategoryComponent,
    FormPictogramComponent,
    CardComponent,
    SkeletonCardComponent,
    ImagesRadioComponent,
    CollapsePanelComponent,
    FormEditCategoryComponent,
    FormEditSubcategoryComponent,
    FormEditPictogramComponent,
    HelpersComponent,
    FormHelperComponent,
    FormEditHelperComponent,
    CrudCategoriesComponent,
    CrudSubcategoriesComponent,
    CrudPictogramsComponent,
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
    AngularFireStorageModule,
    HttpClientModule,
    SkeletonModule,
    FieldsetModule,
    PanelModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
