import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ALGAMONEY_API } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  jwtPayload: any;

  constructor(private http: HttpClient) {
    this.carregarToken();
  }

  login(email: string, senha: string): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': `Basic YW5ndWxhcjpAbmd1bEByMA==`
      })
    };

    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.http.post<any>(`${ALGAMONEY_API}/oauth/token`, body, options)
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      }).catch(response => {
        if (response.status === 400 && response.error.error === 'invalid_grant') {
            return Promise.reject('E-mail e/ou senha inválidos');
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string) {
    localStorage.setItem('token', token);
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
