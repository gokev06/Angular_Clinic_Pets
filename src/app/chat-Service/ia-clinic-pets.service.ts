import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

export interface ChatResponse {
  response: string;
}


@Injectable({
  providedIn: 'root'
})
export class IAClinicPetsService {

  private baseURL: string;
  private apiUrl_1 = 'https://back-end-clinic-pets-production-4373.up.railway.app';


  constructor(
    private http: HttpClient,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.baseURL = apiUrl || 'https://back-end-clinic-pets-production-4373.up.railway.app'; // URL por defecto si no se proporcion
  }

  sendMessage(question: string, history: ChatMessage[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl_1}/chat`, {
      question,
      history
    }).pipe(
      map((response: any) => {
        // Si la respuesta ya tiene el formato correcto, la devolvemos directamente
        if ('response' in response) {
          return response as ChatResponse;
        }
        // Si la respuesta aún tiene el formato antiguo, la convertimos
        else if ('history' in response) {
          const lastMessage = (response as any).history[response.history.length - 1];
          return { response: lastMessage.parts };
        }
        // Si no podemos manejar el formato, lanzamos un error
        else {
          throw new Error('Formato de respuesta no reconocido');
        }
      }),
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
