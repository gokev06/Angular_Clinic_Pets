import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

export interface ChatHistory {
  history: ChatMessage[];
}


@Injectable({
  providedIn: 'root'
})
export class IAClinicPetsService {

  private baseURL: string;
  private apiUrl_1 = 'http://localhost:10101';


  constructor(
    private http: HttpClient,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.baseURL = apiUrl || 'http://localhost:10101'; // URL por defecto si no se proporcion
  }

  sendMessage(question: string, history: ChatMessage[]): Observable<ChatHistory> {
    return this.http.post<ChatHistory>(`${this.apiUrl_1}/chat`, {
        question,
        history
    }).pipe(
        catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            if (error.error instanceof ErrorEvent) {
                console.error('Error del lado del cliente:', error.error.message);
            } else {
                console.error(`El backend devolvió el código ${error.status}, el cuerpo era:`, error.error);
            }
            throw error;
        })
    );
}


}
