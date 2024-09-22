import { HttpInterceptorFn } from "@angular/common/http";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const user = window.sessionStorage.getItem('auth-user');
  let token = null;
  if (user) {
    token = (JSON.parse(user))['accessToken'];
    console.log("User interceptor 2:", token);
  }
  
  req = req.clone({
    withCredentials: true,
    setHeaders: {
      Authorization: 'Bearer ' + token
    }
  });

return next(req)
}

// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class HttpRequestInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       withCredentials: true,
//     });

//     return next.handle(req);
//   }
// }

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
// ];