import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ALGAMONEY_API } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) {
    this.carregarToken();
  }

  login(email: string, senha: string): Promise<any> {
    const options = this.getOptions();
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

  obterNovoAccessToken(): Promise<void> {
    const options = this.getOptions();
    const body = 'grant_type=refresh_token';

    return this.http.post<any>(`${ALGAMONEY_API}/oauth/token`, body, options)
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        console.log('Novo ACCESS TOKEN criado');
        return Promise.resolve(null);
      })
      .catch(error => {
        console.error('Erro ao renovar token', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Acesso expirado',
          detail: 'Efetue o login para obter acesso novamente'
        });

        this.router.navigate(['login']);

        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido(): boolean {
    const accessToken = localStorage.getItem('access_token');

    return !accessToken || this.jwtHelper.isTokenExpired(accessToken);
  }

  possuiPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
    this.jwtPayload = this.jwtHelper.decodeToken(accessToken);
  }

  private carregarToken() {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.armazenarToken(accessToken);
    }
  }

  private getOptions() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': `Basic YW5ndWxhcjpAbmd1bEByMA==`
      }),
      withCredentials: true
    };

    return options;
  }

}
