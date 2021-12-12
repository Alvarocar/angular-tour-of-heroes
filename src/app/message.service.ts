import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messages: string[] = []
  constructor() { }
  add(message: string): void {
    this._messages = [...this._messages, message]
  }
  clear() {
    this._messages = []
  }
  get messages(): string[] {
    return this._messages
  }
}
