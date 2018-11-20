import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  listarTodas(): Promise<any> {
    return this.http.get(`${environment.ALGAMONEY_API}/categorias`).toPromise();
  }

}
