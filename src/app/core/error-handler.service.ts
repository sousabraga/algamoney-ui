import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) {}

  handle(errorResponse: any) {
    console.log('CAIU AQUI');
    let mensagem: string;

    if (errorResponse.error[0]) {
      mensagem = errorResponse.error[0].mensagemUsuario;
    } else {
      mensagem = 'Erro ao processar. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Ocorreu um erro',
      detail: mensagem
    });
  }

}
