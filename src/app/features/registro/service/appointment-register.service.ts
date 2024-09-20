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
    return this.registroType === 'veterinarian' ? 'https://back-end-clinic-pets-production-4373.up.railway.app/registerVet' : 'https://back-end-clinic-pets-production-4373.up.railway.app/register';
  }
}
