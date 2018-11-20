import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { MessageService } from 'primeng/components/common/api';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAccessTokenInvalido()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Acesso negado',
        detail: 'Efetue o login para obter acesso'
      });

      this.router.navigate(['login']);
    } else {
      return true;
    }
  }

}
