import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];

  filtro = new PessoaFiltro();
  totalRegistros = 0;
  loading = false;

  @ViewChild('tabela') tabela;

  private pessoaParaExcluir: any;

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        this.pessoas = response.content;
        this.totalRegistros = response.totalElements;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .then(() => {
        this.pesquisar();
        this.tabela.first = 0;

        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa excluída',
          detail: 'Pessoa excluída com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  confirmarExclusao(pessoa: any) {
    this.pessoaParaExcluir = pessoa;

    this.messageService.clear();
    this.messageService.add({
      key: 'confirm-dialog',
      sticky: true,
      severity: 'warn',
      summary: 'Deseja excluir a pessoa?',
      detail: 'Confirme para prosseguir'
    });
  }

  alterarStatusPessoa(pessoa: any) {
    this.pessoaService.alterarStatusPessoa(pessoa)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status atualizado',
          detail: 'Status atualizado com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.loading = true;
    const pagina = event.first / event.rows;

    this.pesquisar(pagina);

    this.loading = false;
  }

  onConfirm() {
    this.messageService.clear('confirm-dialog');

    if (this.pessoaParaExcluir) {
      this.excluir(this.pessoaParaExcluir);
      this.pessoaParaExcluir = undefined;
    }
  }

  onReject() {
      this.messageService.clear('confirm-dialog');
  }

}
