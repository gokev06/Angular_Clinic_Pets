import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisabledHorariosService {
  private apiUrl = 'http://localhost:10101/desactive'; 
  disabledHorarios: Set<string> = new Set();
  disabledDays: Set<string> = new Set();
  constructor(private http: HttpClient) { 
    this.loadDisabledHorarios();
    this.loadDisabledDays();
  }

  desactivateDay(date: string): Observable<any> {
    console.log('Fecha enviada', date);
    return this.http.post(`${this.apiUrl}/desactivateDay`, { date }, this.getHttpOptions());
  }

  activateDay(date: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activateDay`, { body: { date }, headers: this.getHttpOptions().headers });
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
    this.desactivateTime('', horario).subscribe();
  }

  addDisabledDay(date: string): Observable<any> {
    this.disabledDays.add(date);
    return this.desactivateDay(date); // Devolver el Observable
}

removeDisabledDay(date: string): Observable<any> {
    this.disabledDays.delete(date);
    return this.activateDay(date); // Devolver el Observable
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
