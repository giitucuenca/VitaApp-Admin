import { PageNotFoundComponent } from './../../view/components/page-not-found/page-not-found.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const TOKEN = localStorage.getItem('accessToken');
    if (TOKEN) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    }
    return next.handle(request);
  }
}
