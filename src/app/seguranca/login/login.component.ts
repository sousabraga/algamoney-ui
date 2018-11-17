import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) {}

  login(email: string, senha: string) {
    this.authService.login(email, senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
