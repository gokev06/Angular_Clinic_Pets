import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Appointment {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  sintomas: string;
  nombreMascota: string;
  cantidadVacunas: number;
  edad: number;
  especie: string;
  estadoVacunacion: string;
  raza: string;
  hora: string;
  fecha: string;
  estado: 'Agendada' | 'Reagendada' | 'Cancelada';
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/citas';
  private nextId: number;

  constructor(private http: HttpClient) {
    // Inicializa nextId desde el localStorage o establece en 1 si no existe
    this.nextId = parseInt(localStorage.getItem('nextId') || '1');
  }

  createAppointment(appointmentData: Appointment): Observable<Appointment> {
    // Asigna el próximo ID y luego incrementa para el siguiente
    appointmentData.id = this.nextId++;
    
    // Realiza la llamada HTTP para guardar la cita
    return this.http.post<Appointment>(this.apiUrl, appointmentData).pipe(
      tap(() => {
        // Actualiza el próximo ID en localStorage
        localStorage.setItem('nextId', this.nextId.toString());
      })
    );
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
