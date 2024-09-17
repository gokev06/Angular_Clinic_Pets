import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPetsService {
  private apiUrl = 'http://localhost:10101'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) { }

  publicarMascota(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploadPet`, formData);
  }

  obtenerMascotas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mascotas`); // Nota: Cambio aquí de `any[]` a `any`
  }

  enviarComentario(IdUsuario: string, IdBuscarMascota: number, comentario: string): Observable<any> {
    const body = { IdUsuario, IdBuscarMascota, comentario };
    return this.http.post<any>(`${this.apiUrl}/enviarComentario`, body);
  }

  // lost-pets.service.ts
obtenerComentarios(IdBuscarMascota: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/comentarios/${IdBuscarMascota}`);
}

}
