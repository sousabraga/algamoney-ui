import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  recurso = 'lancamentos';

  constructor(private http: HttpClient) {}

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(`${environment.ALGAMONEY_API}/${this.recurso}`, lancamento).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${environment.ALGAMONEY_API}/${this.recurso}/${lancamento.id}`, lancamento).toPromise();
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = this.popularFiltro(filtro);

    const options = {
      params: params
    };

    return this.http.get(`${environment.ALGAMONEY_API}/${this.recurso}?resumo`, options).toPromise();
  }

  buscarPorId(id: number): Promise<Lancamento>  {
    return this.http.get<Lancamento>(`${environment.ALGAMONEY_API}/${this.recurso}/${id}`).toPromise();
  }

  excluir(id: number): Promise<any> {
    return this.http.delete(`${environment.ALGAMONEY_API}/${this.recurso}/${id}`).toPromise();
  }

  convertStringToDate(lancamentos: Lancamento[]) {
    lancamentos.map(l => {
      if (l.dataVencimento) {
        l.dataVencimento = moment(l.dataVencimento).toDate();
      }

      if (l.dataPagamento) {
        l.dataPagamento = moment(l.dataPagamento).toDate();
      }
    });
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
