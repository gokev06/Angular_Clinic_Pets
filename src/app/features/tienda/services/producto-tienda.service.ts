import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface DataResponse {
  idProducto: string;
  name: string;
  description: string;
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
    return this.http.get<any[]>(`${this.apiUrl_1}/askAllForProducts`, { headers })
      .pipe(
        tap((data) => console.log('Datos recibidos:', data))
      );
  }

}

/*
  getProductoById(id: number): Observable<productos> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<productos>(url);
  } */
