import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ALGAMONEY_API, ACCESS_TOKEN } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    const params = this.popularFiltro(filtro);

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }),
      params: params
    };

    return this.http.get(`${ALGAMONEY_API}/pessoas`, options);
  }

  listarTodas(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return this.http.get(`${ALGAMONEY_API}/pessoas`, options);
  }

  private popularFiltro(filtro: PessoaFiltro): HttpParams {
    let params = new HttpParams();
    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return params;
  }

}

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
