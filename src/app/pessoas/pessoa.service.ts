import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ALGAMONEY_API, ACCESS_TOKEN } from './../app.api';
import { Pessoa } from '../core/model/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) {}

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return this.http.post<Pessoa>(`${ALGAMONEY_API}/pessoas`, pessoa, options).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return this.http.put<Pessoa>(`${ALGAMONEY_API}/pessoas/${pessoa.id}`, pessoa, options).toPromise();
  }

  buscarPorId(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return this.http.get<Pessoa>(`${ALGAMONEY_API}/pessoas/${id}`, options).toPromise();
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = this.popularFiltro(filtro);

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }),
      params: params
    };

    return this.http.get(`${ALGAMONEY_API}/pessoas`, options).toPromise();
  }

  listarTodas(): Promise<any> {
    const options = this.getHeaderOptions();

    return this.http.get(`${ALGAMONEY_API}/pessoas`, options).toPromise();
  }

  excluir(id: number): Promise<any> {
    const options = this.getHeaderOptions();

    return this.http.delete(`${ALGAMONEY_API}/pessoas/${id}`, options).toPromise();
  }

  alterarStatusPessoa(pessoa: any): Promise<any> {
    pessoa.ativo = !pessoa.ativo;

    const options = this.getHeaderOptions();

    return this.http.put(`${ALGAMONEY_API}/pessoas/${pessoa.id}/ativo`, pessoa.ativo, options).toPromise();
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

  // Depois este método será removido quando for utilizar OAuth e JWT
  private getHeaderOptions(): any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      })
    };

    return options;
  }

}

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
