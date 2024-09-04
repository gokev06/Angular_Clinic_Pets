import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
