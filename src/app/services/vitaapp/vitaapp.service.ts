import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';

@Injectable({
  providedIn: 'root',
})
export class VitaappService {
  BASE_URL = 'http://localhost:8080/vitaapp/api/v1';
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

  getColor(): Observable<any> {
    const PATH = this.concatURL(`/color/all`);
    if (this.colors) {
      return this.makeGetRequest(PATH)
      .pipe(
        map(resp => {
          this.colors = resp;
          return resp;
        })
      );
    } else {
      return of(this.colors);
    }
  }

  saveCategory(category: Category): Observable<any> {
    const PATH = this.concatURL(`/category/admin/add`);
    return this.makePostRequest(PATH, category);
  }

  getAllCategories(): Observable<any> {
    const PATH = this.concatURL(`/category/all`);
    return this.makeGetRequest(PATH);
  }

  saveSubcategory(subcategory: Subcategory): Observable<any> {
    const PATH = this.concatURL(`/subcategory/admin/add`);
    return this.makePostRequest(PATH, subcategory);
  }

  getAllSubcategoriesByCategoryId(idCategory: number): Observable<any> {
    const PATH = this.concatURL(`/subcategory/category/${idCategory}`);
    return this.makeGetRequest(PATH);
  }
}
