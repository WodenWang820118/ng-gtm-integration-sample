import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './chatbot.component.html',
  styles: [
    `
      .chat-messages {
        height: 300px;
        overflow-y: auto;
      }

      .card {
        border-radius: 10px;
      }

      .card-header {
        border-radius: 10px 10px 0 0;
        padding: 0.5rem 0rem 0.5rem 2rem;
      }

      .bi-chevron-up {
        display: inline-block;
        transition: transform 0.5s ease;
      }

      button[aria-expanded='false'] > .bi {
        transform: rotate(180deg);
      }
    `,
  ],
})
export class ChatbotComponent {
  messages$ = this.chatbotService.messages$;
  isCollapsed: boolean = false;
  userInput: string = '';

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.chatbotService.sendMessage(this.userInput);
      this.userInput = '';
    }
  }

  clearMessages() {
    this.chatbotService.clearMessages();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
