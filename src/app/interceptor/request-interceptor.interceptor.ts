import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthorizationService } from '../service/authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {

  clonedRequest: HttpRequest<any>;

  constructor(private authService: AuthorizationService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
      });
    }

    return next.handle(request)
    .pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('Authorization')) {
            this.authService.setToken(event.headers.get('Authorization'));
          }
        }
      },(error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status) {
              switch (error.status) {
                case 401:
                  this.router.navigate(['login']);
                  this.authService.removeToken();
                  break;
                case 403:
                  this.router.navigate(['login']);
                  this.authService.removeToken();
                  break;
                case 404:
                  // not found page
                  break;
                case 500:
                  // server exception
                  break;
              }
            } else {
              // server Error
            }
          }
        })
    );

  }
}
