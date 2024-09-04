import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private apiUrl = 'http://localhost:10101/veterinaryManagement';
  private statusUrl = 'http://localhost:10101/veterinaryStatus';  // URL para cambiar el estado

  constructor(private http: HttpClient) {}

  getVeterinarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  changeVeterinaryStatus(id: string, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.statusUrl}`, { IdVeterinario: id, newStatus: newStatus });
  }
}
