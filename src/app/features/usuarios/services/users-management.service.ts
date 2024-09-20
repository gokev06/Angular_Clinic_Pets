import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private apiUrl = 'https://back-end-clinic-pets-production-4373.up.railway.app/veterinaryManagement';
  private statusUrl = 'https://back-end-clinic-pets-production-4373.up.railway.app/veterinaryStatus';  // URL para cambiar el estado

  constructor(private http: HttpClient) {}

  getVeterinarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  changeVeterinaryStatus(id: string, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.statusUrl}`, { IdVeterinario: id, newStatus: newStatus });
  }
}
