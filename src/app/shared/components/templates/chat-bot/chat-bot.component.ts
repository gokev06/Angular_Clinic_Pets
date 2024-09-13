import { Component, OnInit } from '@angular/core';
import { IAClinicPetsService, ChatMessage } from '../../../../chat-Service/ia-clinic-pets.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent  implements OnInit{
  isChatOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;

  constructor(private iaService: IAClinicPetsService){}

  ngOnInit(): void {
    this.messages.push({
      role: 'model',
      parts: '¡Hola! Estoy disponible para cualquier pregunta relacionada con el cuidado de animales domésticos. Pregunta si tienes alguna duda.'
    })
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(){
     if(this.userInput.trim() === '') return;
       // Añadir mensaje del usuario
       this.messages.push({
        role: 'user',
        parts: this.userInput
       });

        // Limpiar input y mostrar loader
        const userMessage = this.userInput;
        this.userInput = '';
        this.isLoading = true;

         // Enviar mensaje a la IA
         this.iaService.sendMessage(userMessage, this.messages).subscribe({
          next: (response) => {
            this.messages = response.history;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error al enviar  mensaje:', error);
            this.messages.push({
              role: 'model',
              parts: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.'
            });
            this.isLoading = false;
          }
         });
  }

}
