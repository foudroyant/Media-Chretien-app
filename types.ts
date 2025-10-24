
export type Sender = 'user' | 'bot' | 'system';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
