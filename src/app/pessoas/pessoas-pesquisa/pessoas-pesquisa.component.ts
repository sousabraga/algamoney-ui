import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    {
      nome: 'Matheus Braga',
      cidade: 'Fortaleza',
      estado: 'CE',
      ativo: true
    },
    {
      nome: 'Josaphat Braga',
      cidade: 'Nanuque',
      estado: 'MG',
      ativo: false
    },
    {
      nome: 'Valdete',
      cidade: 'Mundaú',
      estado: 'CE',
      ativo: true
    },
    {
      nome: 'Reginaldo',
      cidade: 'Teresina',
      estado: 'PI',
      ativo: true
    }
  ];

}
