import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    private messageService: MessageService) {}

  ngOnInit() {}

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        form.reset();

        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa cadastrada',
          detail: 'Pessoa cadastrada com sucesso'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
