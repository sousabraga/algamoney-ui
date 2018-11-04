import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent  {

  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: '30/12/2018',
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria do José'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Software',
      dataVencimento: '25/12/2018',
      dataPagamento: null,
      valor: 80000,
      pessoa: 'Atacado Brasil'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Carro',
      dataVencimento: '10/12/2018',
      dataPagamento: null,
      valor: 50000,
      pessoa: 'Sebastião Sousa'
    }
  ];

}
