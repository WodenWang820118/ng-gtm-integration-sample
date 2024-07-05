import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Message {
  text: string;
  isUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() {}

  sendMessage(userInput: string) {
    const currentMessages = this.messagesSubject.getValue();
    const updatedMessages = [
      ...currentMessages,
      { text: userInput, isUser: true },
    ];
    this.messagesSubject.next(updatedMessages);

    // Here you would typically call a service to get the chatbot's response
    // For this example, we'll just echo the user's message
    setTimeout(() => {
      const botResponse = {
        text: `Stay tuned to the chatbot service to get a real response!`,
        isUser: false,
      };
      this.messagesSubject.next([...updatedMessages, botResponse]);
    }, 500);
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }
}
