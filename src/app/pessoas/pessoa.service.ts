import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Pessoa } from '../core/model/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  recurso = 'pessoas';

  constructor(private http: HttpClient) {}

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(`${environment.ALGAMONEY_API}/${this.recurso}`, pessoa).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${environment.ALGAMONEY_API}/${this.recurso}/${pessoa.id}`, pessoa).toPromise();
  }

  buscarPorId(id: number) {
    return this.http.get<Pessoa>(`${environment.ALGAMONEY_API}/${this.recurso}/${id}`).toPromise();
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = this.popularFiltro(filtro);

    const options = {
      params: params
    };

    return this.http.get(`${environment.ALGAMONEY_API}/${this.recurso}`, options).toPromise();
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${environment.ALGAMONEY_API}/${this.recurso}`).toPromise();
  }

  excluir(id: number): Promise<any> {
    return this.http.delete(`${environment.ALGAMONEY_API}/${this.recurso}/${id}`).toPromise();
  }

  alterarStatusPessoa(pessoa: any): Promise<any> {
    pessoa.ativo = !pessoa.ativo;

    return this.http.put(`${environment.ALGAMONEY_API}/${this.recurso}/${pessoa.id}/ativo`, pessoa.ativo).toPromise();
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
