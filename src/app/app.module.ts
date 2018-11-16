import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/api';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { AppComponent } from './app.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

registerLocaleData(localePt, 'pt');

const appRoutes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'lancamentos', component: LancamentosPesquisaComponent},
  {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  {path: 'lancamentos/:id', component: LancamentoCadastroComponent},
  {path: 'pessoas', component: PessoasPesquisaComponent},
  {path: 'pessoas/nova', component: PessoaCadastroComponent},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    ToastModule,
    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
