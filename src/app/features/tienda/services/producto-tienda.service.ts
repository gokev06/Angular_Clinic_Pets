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

export interface DataProduct {
  IdUsuarioProducto: string,
  IdUsuario: string,
  IdProducto: string,
  imagen: string,
  nombreProducto: string,
  cantidad: number,
  precioUnitario: number,
  precioTotal: number,
}

export interface productInfo {
  IdProducto: string,
  imagen: string,
  nombreProducto: string,
  descripcion: string,
  informacion: string,
  precio: number,
  stock: number,
  categoria: string,
  seleccionTallaPresentacion: string,
}





@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  deleteAllCards() {
    throw new Error('Method not implemented.');
  }
  eliminarProductoCarrito(IdUsuarioProducto: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl_1 = 'http://localhost:10101';
  private carrito: DataProduct[] = []; // Añadir un array para almacenar el carrito


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

  getDataProductCart(): Observable <DataProduct[]> {
    const  token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Suponiendo que el token puede ser necesario
  });
    return this.http.get<any>(`${this.apiUrl_1}/uploadProductUser`, {headers}).pipe(
      map((response) => response.Result.map((item: any)=> ({
        IdUsuarioProducto: item.IdUsuarioProducto,
        IdUsuario: item.IdUsuario,
        IdProducto: item.IdProducto,
        imagen: item.imagen,
        nombreProducto: item.nombreProducto,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        precioTotal: item.precioTotal,
      })))
    );

  }

  actualizarCantidadProductoCarrito(IdUsuarioProducto: string, nuevaCantidad: number): Observable <DataProduct> {
    const token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const cuerpo = { cantidad: nuevaCantidad };
    return this.http.put<any>(`${this.apiUrl_1}/actualizarCantidadProductoCarrito/${IdUsuarioProducto}`, cuerpo, {headers})
  }

  getDataProductIdInfo(IdProducto: string): Observable <productInfo[]>{
    const token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl_1}/askProductInfo/${IdProducto}`, {headers}).pipe(
      map( (Response) => Response.Result.map((item: any) => ({
         IdProducto: item.IdProducto,
         imagen: item.imagen,
         nombreProducto: item.nombreProducto,
         descripcion: item.descripcion,
         informacion: item.informacion,
         precio: item.precio,
         stock: item.stock,
         categoria: item.categoria,
         seleccionTallaPresentacion: item.seleccionTallaPresentacion
      })))
    )
  }

  callProductData(IdProducto: string): Observable <DataResponse[]> {
    const  token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Suponiendo que el token puede ser necesario
  });
    return this.http.get<any>(`${this.apiUrl_1}/uploadProductId/${IdProducto}`,{headers} ).pipe(
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

  deleteProductCart(): Observable <any>{
    const  token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Suponiendo que el token puede ser necesario
    });

    return this.http.delete(`${this.apiUrl_1}/removeAllProductCart`, {headers}).pipe(
      catchError( error => {
        console.error('Error en la eliminacion del producto', error);
        return of (null);
      })
    )
  }

  addProductCart(productPush: any): Observable<any>{
    const  token: string | null = localStorage.getItem('userToken');
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(`${this.apiUrl_1}/addProductCart`, productPush, {headers});
  };


  setCarrito(productos: DataProduct[]): void {
    this.carrito = productos;
  }

  // Método para obtener el carrito
  getCarrito(): DataProduct[] {
    return this.carrito;
  }
}



/*
  getProductoById(id: number): Observable<productos> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<productos>(url);
  } */
