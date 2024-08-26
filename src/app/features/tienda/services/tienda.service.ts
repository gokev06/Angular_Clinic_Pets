import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private apiUrl_1 = 'http://localhost:10101';

  constructor(private http: HttpClient) {}

  createProducts(productData: any, token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl_1}/addProductsAdmin`, productData, {headers});
  }

  createPets(petsData: any, token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl_1}/addPetsUser`, petsData, {headers});
  }

}
