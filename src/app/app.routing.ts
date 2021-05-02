import { CrudCategoriesComponent } from './view/board/crud-categories/crud-categories.component';
import { AuthGuard } from './services/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/auth/login/login.component';
import { MainComponent } from './view/main/main/main.component';
import { LayoutComponent } from './view/layout/layout/layout.component';
import { BoardComponent } from './view/board/board/board.component';
import { HelpersComponent } from './view/helpers/helpers/helpers.component';
import { CrudSubcategoriesComponent } from './view/board/crud-subcategories/crud-subcategories.component';
import { CrudPictogramsComponent } from './view/board/crud-pictograms/crud-pictograms.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            component: MainComponent,
          },
        ],
      },
      {
        path: '',
        component: BoardComponent,
        children: [
          {
            path: 'panel/categorias',
            component: CrudCategoriesComponent,
          },
          {
            path: 'panel/subcategorias/:id',
            component: CrudSubcategoriesComponent,
          },
          {
            path: 'panel/pictogramas/:id',
            component: CrudPictogramsComponent,
          },
        ],
      },
      {
        path: 'ayudas',
        children: [
          {
            path: '',
            component: HelpersComponent,
          },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
