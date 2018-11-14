import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];

  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  private carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(response => {
        this.categorias = response.map(c => ({label: c.nome, value: c.id}) );
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(response => {
        this.pessoas = response.content.map(p => ({label: p.nome, value: p.id}) );
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
