import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisabledHorariosService {
  private apiUrl = 'http://localhost:10101/desactive'; 
  private disabledHorarios: Set<string> = new Set();
  private disabledDays: Set<string> = new Set();
  constructor(private http: HttpClient) { 
    this.loadDisabledHorarios();
    this.loadDisabledDays();
  }

  desactivateDay(date: string): Observable<any> {
    const fechaSeleccionada = new Date(date);
    const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0]; // Asegurar formato yyyy-MM-dd
    return this.http.post(`${this.apiUrl}/desactivateDay`, { date: fechaFormateada }, this.getHttpOptions());
  }
  
  
  activateDay(date: string): Observable<any> {
    const fechaSeleccionada = new Date(date);
    const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0]; // Asegurar formato yyyy-MM-dd
    return this.http.delete(`${this.apiUrl}/activateDay?date=${fechaFormateada}`, this.getHttpOptions());
  }
  
  
  desactivateTime(date: string, time: string): Observable<any> {
    console.log('Fecha y hora enviadas', date, time);
    return this.http.post(`${this.apiUrl}/desactivateTime`, { date, time }, this.getHttpOptions());
  }
  
  activateTime(date: string, time: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activateTime?date=${date}&time=${time}`, this.getHttpOptions());
  }
  
  getDisabledDays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getDisabledDays`, this.getHttpOptions());
  }
  
  getDisabledTimes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getDisabledTimes`, this.getHttpOptions());
  }
  

  getHttpOptions() {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  getDisabledHorarios(): Set<string> {
    return this.disabledHorarios;
  }

  getDisabledDaysLocal(): Set<string> {
    return this.disabledDays;
  }

  addDisabledHorario(horario: string): void {
    this.disabledHorarios.add(horario);
    this.desactivateTime('', horario).subscribe();
  }

  removeDisabledHorario(horario: string): void {
    this.disabledHorarios.delete(horario);
    this.activateTime('', horario).subscribe();  // Debe activar, no desactivar
  }

  addDisabledDay(date: string): void {
    this.disabledDays.add(date);
    this.desactivateDay(date).subscribe();
  }

  removeDisabledDay(date: string): void {
    this.disabledDays.delete(date);  // Eliminamos el día de la lista de desactivados localmente
    this.activateDay(date).subscribe();  // Llamada al backend para activar el día
  }
  

  loadDisabledHorarios(): void {
    this.getDisabledTimes().subscribe((times: string[]) => {
      this.disabledHorarios = new Set(times);
    });
  }

  loadDisabledDays(): void {
    this.getDisabledDays().subscribe((days: string[]) => {
      this.disabledDays = new Set(days);
    });
  }
}
