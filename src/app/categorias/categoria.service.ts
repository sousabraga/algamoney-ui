import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ALGAMONEY_API } from './../app.api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  listarTodas(): Promise<any> {
    return this.http.get(`${ALGAMONEY_API}/categorias`).toPromise();
  }

}
