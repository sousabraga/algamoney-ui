import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('Authorization') && req.headers.get('Authorization').startsWith('Basic')) {
      return next.handle(req);
    } else {
      if (this.authService.isAccessTokenInvalido()) {
        this.authService.obterNovoAccessToken()
          .then(() => {
            return next.handle(this.requestClone(req));
          });
      } else {
        return next.handle(this.requestClone(req));
      }
    }
  }

  private requestClone(req: HttpRequest<any>): HttpRequest<any> {
    const authRequest = req.clone(
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          })
      }
    );

    return authRequest;
  }

}
