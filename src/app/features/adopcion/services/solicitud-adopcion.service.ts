import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private apiurl = 'http://localhost:8000/adopciones'


  constructor( private http: HttpClient) { }

  getAdopciones(): Observable<adopcion[]> {
    return this.http.get<adopcion[]>(this.apiurl);
  }

}
