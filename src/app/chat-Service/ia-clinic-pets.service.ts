import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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



  constructor(
    private http: HttpClient,
    @Optional() @Inject('API_URL') apiUrl?: string
  ) {
    this.baseURL = apiUrl || 'http://localhost:10101'; // URL por defecto si no se proporcion
  }

  sendMessage(question: string, history: ChatMessage[]): Observable<ChatHistory> {
    return this.http.post<ChatHistory>(`${this.baseURL}/chat`, {
      question,
      history
    });
  }


}
