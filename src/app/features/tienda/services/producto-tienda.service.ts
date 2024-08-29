import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface productos {
  id?: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiurl = 'http://localhost:8000/productos'; // URL de la API

  constructor(private http: HttpClient) { }

  getProductos(): Observable<productos[]> {
    return this.http.get<productos[]>(this.apiurl);
  }

  getProductoById(id: number): Observable<productos> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<productos>(url);
  }
}
