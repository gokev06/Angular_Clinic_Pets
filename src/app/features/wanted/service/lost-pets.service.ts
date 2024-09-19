import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPetsService {
  private apiUrl = 'http://localhost:10101'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  publicarMascota(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploadPet`, formData);
  }

  obtenerMascotas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mascotas`);
  }

  enviarComentario(IdUsuario: string, IdBuscarMascota: number, comentario: string): Observable<any> {
    const token: string | null = localStorage.getItem('userToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { IdUsuario, IdBuscarMascota, comentario };
    console.log('Cuerpo del comentario:', body); // Agrega este log para verificar los datos
    return this.http.post<any>(`${this.apiUrl}/enviarComentario`, body,{headers});
  }
  

  obtenerComentarios(IdBuscarMascota: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comentarios/${IdBuscarMascota}`, { headers: this.getAuthHeaders() });
}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerIdUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtenerIdUsuario`, { headers: this.getAuthHeaders() });
  }
  
  
}
