import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisabledHorariosService {
  private apiUrl = 'tu-api-url/desactive'; // Reemplaza con la URL de tu API
  private readonly disabledHorariosKey = 'disabledHorarios';
  private readonly disabledDaysKey = 'disabledDays';

  private disabledHorarios: Set<string> = new Set();
  private disabledDays: Set<string> = new Set();

  constructor(private http: HttpClient) { 
    this.loadDisabledHorarios();
    this.loadDisabledDays();
  }

  // Desactivar un día
  desactivateDay(date: string): Observable<any> {
    return this.http.post(this.apiUrl, { dias: date }, this.getHttpOptions());
  }

  // Desactivar una hora
  desactivateTime(date: string, time: string): Observable<any> {
    return this.http.post(this.apiUrl, { dias: date, horas: time }, this.getHttpOptions());
  }

  // Consultar días desactivados
  getDisabledDays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/days`, this.getHttpOptions());
  }

  // Consultar horas desactivadas
  getDisabledTimes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/times`, this.getHttpOptions());
  }

  private getHttpOptions() {
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
    this.desactivateTime('', horario).subscribe();
  }

  addDisabledDay(date: string): void {
    this.disabledDays.add(date);
    this.desactivateDay(date).subscribe();
  }

  removeDisabledDay(date: string): void {
    this.disabledDays.delete(date);
    this.desactivateDay(date).subscribe();
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
