import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface adopcion{
  id?: number;
  nombre: string;
  edad: string;
  especie: string;
  raza: string;
  sexo: string;
  estirilizacion: string;
  vacunacion: string;
  telefono: string;
  municipio: string;
  ciudad: string;
  image:string;
}


@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {

  private apiurl = 'http://localhost:8000/adopciones';
  private apiUrl_1 = 'http://localhost:10101';
  private apiUrl_2 = 'http://localhost:10101';
 
  constructor( private http: HttpClient) { }

  getAdopciones(): Observable<adopcion[]> {
    return this.http.get<adopcion[]>(this.apiurl);
  }

  createPets(petsData: any, token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl_1}/addPetsUser`, petsData, {headers});
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    return this.http.post(` ${this.apiUrl_2}/filesUpload`, formData, { headers });
  }

}
