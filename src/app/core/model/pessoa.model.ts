import { Endereco } from './endereco.model';

export class Pessoa {

  id: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();

}
