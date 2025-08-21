export interface Transaction {
  id: number;
  amount: number;
  category: string; // Corresponds to Category['name']
  description?: string;
  timestamp: string; // Using timestamp for simplicity
}

export interface Category {
  id: number;
  name: string;
}

export interface UserData {
  balance: number;
}
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  date: number; // Using timestamp for simplicity
}