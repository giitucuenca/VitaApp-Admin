import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';
import { Pictogram } from 'src/app/controller/interfaces/pictogram.interface';
import { PictogramHelp } from 'src/app/controller/interfaces/pictogram-help.interface';

@Injectable({
  providedIn: 'root',
})
export class VitaappService {
  BACKEND_URL = 'https://web-production-1ec4.up.railway.app';
  BASE_URL = `${this.BACKEND_URL}/vitaapp/api/v1`;
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  colors = [];

  constructor(private http: HttpClient) {}

  concatURL(subURL: string): string {
    return this.BASE_URL + subURL;
  }

  makePostRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.post(URL, data, headers);
  }

  makeGetRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.get(URL, headers);
  }

  makeDelRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.delete(URL, headers);
  }

  makePutRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.put(URL, data, headers);
  }

  loginUser(username: string, password: string): Observable<any> {
    const USER = {
      username,
      password,
    };

    const PATH = this.concatURL(`/admin/auth`);

    return this.makePostRequest(PATH, USER);
  }

  validToken(): Observable<any> {
    const PATH = this.concatURL(`/admin/valid`);
    return this.makeGetRequest(PATH);
  }

  // * -------------------Servicios de Colores-------------------
  getColor(): Observable<any> {
    const PATH = this.concatURL(`/color/any/all`);
    if (this.colors) {
      return this.makeGetRequest(PATH).pipe(
        map((resp) => {
          this.colors = resp;
          return resp;
        })
      );
    } else {
      return of(this.colors);
    }
  }

  // * -------------------Servicios de Categorias-------------------

  saveCategory(category: Category): Observable<any> {
    const PATH = this.concatURL(`/category/admin/add`);
    return this.makePostRequest(PATH, category);
  }

  editCategory(category: Category): Observable<any> {
    const PATH = this.concatURL(`/category/admin/${category.categoryId}`);
    return this.makePutRequest(PATH, category);
  }

  getAllCategories(): Observable<any> {
    const PATH = this.concatURL(`/category/any/all`);
    return this.makeGetRequest(PATH);
  }

  // * -------------------Servicios de Subcategorias-------------------

  saveSubcategory(subcategory: Subcategory): Observable<any> {
    const PATH = this.concatURL(`/subcategory/admin/add`);
    return this.makePostRequest(PATH, subcategory);
  }

  editSubcategory(subcategory: Subcategory): Observable<any> {
    const PATH = this.concatURL(
      `/subcategory/admin/${subcategory.subcategoryId}`
    );
    return this.makePutRequest(PATH, subcategory);
  }

  getAllSubcategoriesByCategoryId(idCategory: number): Observable<any> {
    const PATH = this.concatURL(`/subcategory/any/category/${idCategory}`);
    return this.makeGetRequest(PATH);
  }

  getSubcategorybyId(idSubcategory: number): Observable<any> {
    const PATH = this.concatURL(`/subcategory/any/${idSubcategory}`);
    return this.makeGetRequest(PATH);
  }

  // * -------------------Servicios de Pictogramas-------------------

  savePictogram(pictogram: Pictogram): Observable<any> {
    const PATH = this.concatURL(`/pictogram/admin/add`);
    return this.makePostRequest(PATH, pictogram);
  }

  editPictogram(pictogram: Pictogram): Observable<any> {
    const PATH = this.concatURL(`/pictogram/admin/${pictogram.pictogramId}`);
    return this.makePutRequest(PATH, pictogram);
  }

  getAllPictogramsBySubcategoryId(idSubcategory: number): Observable<any> {
    const PATH = this.concatURL(`/pictogram/any/subcategory/${idSubcategory}`);
    return this.makeGetRequest(PATH);
  }

  // * -------------------Servicios de Pictogramas de Ayuda-------------------

  savePictogramHelp(pictogram: PictogramHelp): Observable<any> {
    const PATH = this.concatURL(`/pictogram-help/admin/add`);
    return this.makePostRequest(PATH, pictogram);
  }

  editPictogramHelp(pictogram: PictogramHelp): Observable<any> {
    const PATH = this.concatURL(
      `/pictogram-help/admin/${pictogram.pictogramId}`
    );
    return this.makePutRequest(PATH, pictogram);
  }

  deletePictogramHelp(pictogramId: number): Observable<any> {
    const PATH = this.concatURL(`/pictogram-help/admin/${pictogramId}`);
    return this.makeDelRequest(PATH);
  }

  getAllPictogramsHelp(): Observable<any> {
    const PATH = this.concatURL(`/pictogram-help/any/all`);
    return this.makeGetRequest(PATH);
  }

  getImagesPictogramsHelp(helperId: number): Observable<any> {
    const PATH = this.concatURL(`/image/any/pictogram-help/${helperId}`);
    return this.makeGetRequest(PATH);
  }
}
