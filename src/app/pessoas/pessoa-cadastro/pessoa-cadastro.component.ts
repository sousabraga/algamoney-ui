import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { Pessoa } from 'src/app/core/model/pessoa.model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.verificarEdicao();
  }

  salvar(form: FormControl) {
    if (this.pessoa.id) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.router.navigate(['pessoas']);
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa cadastrada',
          detail: 'Pessoa cadastrada com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.router.navigate(['pessoas']);
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa atualizada',
          detail: 'Pessoa atualizada com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private verificarEdicao() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.pessoaService.buscarPorId(id)
        .then(response => this.pessoa = response)
        .catch(error => this.errorHandlerService.handle(error));
    }
  }

}
