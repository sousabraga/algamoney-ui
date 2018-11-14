import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/api';

import { LancamentoService } from '../lancamento.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from './../../core/model/lancamento.model';

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

  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        form.reset();

        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento cadastrado',
          detail: 'Lançamento cadastrado com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
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
