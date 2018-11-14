import { Categoria } from './categoria.model';
import { Pessoa } from './pessoa.model';

export class Lancamento {

  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

}
