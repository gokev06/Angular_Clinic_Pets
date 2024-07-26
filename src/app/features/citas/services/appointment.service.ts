import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:10101/schedule';

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: any): Observable<any> {
    console.log('Datos enviados al backend:', appointmentData);
    return this.http.post(`${this.apiUrl}`, appointmentData);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
