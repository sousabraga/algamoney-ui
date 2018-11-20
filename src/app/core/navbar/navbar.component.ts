import { Component } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibeMenu = false;

  constructor(private authService: AuthService) {}

  getNomeUsuario(): string {
    if (this.authService.jwtPayload) {
      return this.authService.jwtPayload.nome;
    }

    return '';
  }

  possuiPermissao(permissao: string): boolean {
    return this.authService.possuiPermissao(permissao);
  }

  logout() {
    this.authService.logout();
  }

}
