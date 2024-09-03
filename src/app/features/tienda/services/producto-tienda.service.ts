import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map} from 'rxjs';

export interface DataResponse {
  IdProducto: string;
  imagen: string;
  nombreProducto: string;
  precio: number;
  stock: number;
  categoria: string;
  seleccionTallaPresentacion: string;
  descripcion:string;
  informacion: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl_1 = 'http://localhost:10101';
  private token: string | null = localStorage.getItem('userToken');

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    let headers = new HttpHeaders();
    if(this.token){
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return this.http.get<any[]>(`${this.apiUrl_1}`, { headers })
      .pipe(
        tap((data) => console.log('Datos recibidos:', data))
      );
  }

  getDataProducts(): Observable <DataResponse[]> {
    return this.http.get<any>(`${this.apiUrl_1}/askAllForProducts`).pipe(
      map((response) => response.Result.map((item: any) => ({
        IdProducto: item.IdProducto,
        imagen: item.imagen,
        nombreProducto: item.nombreProducto,
        precio: item.precio,
        stock: item.stock,
        categoria: item.categoria,
        seleccionTallaPresentacion: item.seleccionTallaPresentacion,
        descripcion: item.descripcion,
        informacion: item.informacion
      })))
    );
  }

}

/*
  getProductoById(id: number): Observable<productos> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<productos>(url);
  } */
