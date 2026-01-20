// // todas las peticiones llevan el token automaticamente al back
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');

//     // vistas sin autorizacion
//     if (req.url.includes('/login') || req.url.includes('/registro') || req.url.includes('/home')) {
//       return next.handle(req);
//     }

//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }
//   }
// }

// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     // 🔓 ENDPOINTS PÚBLICOS (NO TOKEN)
//     const publicEndpoints = [
//       '/login/',
//       '/registro/',
//       '/productos/',
//       '/servicios/'
//     ];

//     const isPublic = publicEndpoints.some(endpoint =>
//       req.url.includes(endpoint)
//     );

//     if (isPublic) {
//       return next.handle(req);
//     }

//     const token = sessionStorage.getItem('access_token');

//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { TokenService } from '../service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const publicEndpoints = [
      '/login/',
      '/registro/',
      '/productos/',
      '/servicios/'
    ];

    const isPublic = publicEndpoints.some(endpoint =>
      req.url.includes(endpoint)
    );

    if (isPublic) {
      return next.handle(req);
    }

    const token = sessionStorage.getItem('access_token'); // 🔥 ACÁ

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}


