import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPetsService {
  private apiUrl = 'https://back-end-clinic-pets-production-4373.up.railway.app'; // Cambia esto según tu configuración
  private simulatedDelay = 2000; // Retraso simulado de 2 segundos

  constructor(private http: HttpClient) {}

   // Método auxiliar para agregar retraso
   private addDelay<T>(obs: Observable<T>): Observable<T> {
    return of(null).pipe(
      delay(this.simulatedDelay),
      mergeMap(() => obs)
    );
  }

  publicarMascota(formData: FormData): Observable<any> {
    return this.addDelay(this.http.post<any>(`${this.apiUrl}/uploadPet`, formData));
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
    return this.http.post<any>(`${this.apiUrl}/enviarComentario`, body, {headers});
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
