import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private apiUrl_1 = 'https://back-end-clinic-pets-production-4373.up.railway.app';

  constructor(private http: HttpClient) {}

  createProducts(productData: any, token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl_1}/addProductsAdmin`, productData, {headers});
  }

  updateProduct(productId: string, productData: any, token: string | null): Observable <any> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(`${this.apiUrl_1}/updateProduct/${productId}`, productData, { headers });
  }


}
