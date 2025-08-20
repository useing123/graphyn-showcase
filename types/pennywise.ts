export interface Transaction {
  id: string;
  amount: number;
  category: string; // Corresponds to Category['name']
  description?: string;
  date: number; // Using timestamp for simplicity
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name from a library like lucide-react-native
}

export interface UserData {
  balance: number;
}