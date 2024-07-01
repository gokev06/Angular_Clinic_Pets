// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginWithGoogle() {
    return this.http.get('/auth/google'); // Asegúrate de que la URL sea correcta según tu backend
  }
}
