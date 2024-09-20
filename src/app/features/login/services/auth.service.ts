import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://back-end-clinic-pets-production-4373.up.railway.app/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, contrasenia: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, contrasenia }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('mitoken', response.token);
          console.log('Token almacenado:', localStorage.getItem('mitoken'));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('mitoken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('mitoken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
