import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRegisterService {
  private registroType: string = 'user'; // 'user' o 'veterinarian'

  setRegistroType(type: string) {
    this.registroType = type;
  }

  getRegistroType() {
    return this.registroType;
  }

  getRegistroUrl() {
    return this.registroType === 'veterinarian' ? 'http://localhost:10101/registerVet' : 'http://localhost:10101/register';
  }
}
