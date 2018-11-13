import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

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

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe(response => {
        this.lancamentos = response.content;
        this.totalRegistros = response.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.loading = true;
    const pagina = event.first / event.rows;

    this.pesquisar(pagina);

    this.loading = false;
  }

}
