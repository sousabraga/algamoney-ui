import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import * as moment from 'moment';

import { ALGAMONEY_API, ACCESS_TOKEN } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const params = this.popularFiltro(filtro);

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }),
      params: params
    };

    return this.http.get(`${ALGAMONEY_API}/lancamentos?resumo`, options);
  }

  excluir(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return this.http.delete(`${ALGAMONEY_API}/lancamentos/${id}`, options);
  }

  private popularFiltro(filtro: LancamentoFiltro): HttpParams {
    let params = new HttpParams();
    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append(
        'dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.append(
        'dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }

    return params;
  }

}

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}
