import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://back-end-clinic-pets-production-4373.up.railway.app/schedule';
  private apiUrl_1 = 'https://back-end-clinic-pets-production-4373.up.railway.app';

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: any, token?:string | null ): Observable<any> {
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(`${this.apiUrl}`,  appointmentData, {headers});
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUserAppointments(token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(`${this.apiUrl_1}/callDate`, { headers });
  }

  getCallTutorData(token?: string | null): Observable <any>{
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(`${this.apiUrl_1}/callTutorData`, {headers});
  }



  createHistoryMedic(historialData: any,token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl_1}/createHistorialMedicVet`, historialData, {headers});

  }

  deleteAppointment(idCita: string): Observable<any> {
    return this.http.delete(`${this.apiUrl_1}/deleteData/${idCita}`);
  }



  getAppointmentsByDate(date: string, token?: string | null): Observable<any[]> {
    let headers = new HttpHeaders();
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any[]>(`${this.apiUrl_1}/callDateAppointments/${date}`, { headers });
  }



  updateAppointment(idCita: string, appointmentData: any, token?: string | null): Observable<any> {
    let headers = new HttpHeaders();
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log('new fecha', appointmentData);

    return this.http.put(`${this.apiUrl_1}/updateAppointment/${idCita}`, appointmentData, { headers });
  }

  updateAppointmentStatus(idCita: string, estado: string, token?: string | null): Observable<any> {
    let headers = new HttpHeaders();
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(`${this.apiUrl_1}/updateAppointment/${idCita}`, { estado }, { headers });
  }

  getAppointments2(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl_1}/appointments`);
  }

  downloadHistorial(idCita: string): Observable<any> {
    console.log('Llamada al servicio downloadHistorial con ID:', idCita); // Verifica la llamada al servicio

    return this.http.get(`${this.apiUrl_1}/downloadHistorial/${idCita},`, {responseType: 'blob'})
  }

  getAllUserDates(): Observable<any> {
    const token: string | null =localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl_1}/callAllDateUser`, {headers});
  }





  sendIdsToBackend(idCita: string, idUsuario: string, token?: string | null): Observable<any> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    let params = new HttpParams()
      .set('idCita', idCita)
      .set('idUsuario', idUsuario);

    console.log('Enviando ID:', { idCita, idUsuario });

    return this.http.get(`${this.apiUrl_1}/sendIds`, { headers, params });
  }


}
