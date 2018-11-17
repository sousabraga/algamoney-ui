import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [LoginComponent]
})
export class SegurancaModule { }
