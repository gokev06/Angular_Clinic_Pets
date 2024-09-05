import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of} from 'rxjs';

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


  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    const  token: string | null = localStorage.getItem('userToken');
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization', `Bearer ${token}`);
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

  callProductData(IdProducto: number): Observable <DataResponse[]> {
    return this.http.get<any>(`${this.apiUrl_1}/uploadProductId`).pipe(
      map( (Response) => Response.Result.map((item: any) => ({
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
    )
  }

  deleteProduct(productId: string): Observable <any>{
    const  token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Suponiendo que el token puede ser necesario
  });

   return this.http.delete(`${this.apiUrl_1}/deleteProduct/${productId}`, { headers}).pipe(
      catchError( error => {
            console.error('Error en la eliminacion del producto', error);
            return of (null);

      })
    );
  }

}



/*
  getProductoById(id: number): Observable<productos> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<productos>(url);
  } */
