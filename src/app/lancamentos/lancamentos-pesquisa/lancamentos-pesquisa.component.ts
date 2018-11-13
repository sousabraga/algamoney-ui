import { Component, OnInit, ViewChild } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  loading = false;

  @ViewChild('tabela') tabela;

  private lancamentoParaExcluir: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe(response => {
        this.lancamentos = response.content;
        this.totalRegistros = response.totalElements;
      });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .toPromise()
      .then(response => {
        this.pesquisar();
        this.tabela.first = 0;

        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento excluído',
          detail: 'Lançamento excluído com sucesso'
        });
      }).catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao excluir',
          detail: 'Ocorreu um erro ao tentar excluir o lançamento'
        });
      });
  }

  confirmarExclusao(lancamento: any) {
    this.lancamentoParaExcluir = lancamento;

    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Deseja excluir o lançamento?',
      detail: 'Confirme para prosseguir'
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.loading = true;
    const pagina = event.first / event.rows;

    this.pesquisar(pagina);

    this.loading = false;
  }

  onConfirm() {
    console.log(`LAnçamento para excluir: ${JSON.stringify(this.lancamentoParaExcluir)}`);
    this.messageService.clear('c');

    if (this.lancamentoParaExcluir) {
      this.excluir(this.lancamentoParaExcluir);
      this.lancamentoParaExcluir = undefined;
    }
  }

  onReject() {
      this.messageService.clear('c');
  }

}
