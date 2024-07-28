import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:10101/schedule';
  private apiUrl_1 = 'http://localhost:10101';

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: any): Observable<any> {
    console.log('Datos enviados al backend:', appointmentData);
    return this.http.post(`${this.apiUrl}`, appointmentData);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Nuevo metodo para obtener las citas del usuario 
  getUserAppointments(token?: string | null): Observable<any>{
    let headers = new HttpHeaders()

    if(token){
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(`${this.apiUrl_1}/callDate`, { headers});
  }

  deleteAppointment(idCita: string): Observable<any> {
    console.log('se paso correctamente el idCita: ', idCita);
    
    return this.http.delete(`${this.apiUrl_1}/deleteData/${idCita}`);
  }
}
