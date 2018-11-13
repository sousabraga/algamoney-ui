import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { ALGAMONEY_API, ACCESS_TOKEN } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }),
      params: params
    };

    return this.http.get(`${ALGAMONEY_API}/lancamentos?resumo`, options);
  }

}

export interface LancamentoFiltro {
  descricao: string;
}
