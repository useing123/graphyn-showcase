import { MOCK_CATEGORIES } from '@/constants/mock';
import { Category, Transaction, UserData } from '@/types/pennywise';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Re-export types for easier imports
export type { Transaction, Category, UserData };

const TRANSACTIONS_KEY = 'pennywise_transactions';
const USER_DATA_KEY = 'pennywise_user_data';

// Transactions
export const addTransaction = async (transaction: Transaction): Promise<void> => {
console.log('Saving transaction:', transaction);
  try {
    const existingTransactions = await getTransactions();
    const updatedTransactions = [...existingTransactions, transaction];
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
  } catch (error) {
    console.error('Error saving transaction:', error);
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
};

export const updateTransaction = async (updatedTransaction: Transaction): Promise<void> => {
  try {
    const existingTransactions = await getTransactions();
    const updatedTransactions = existingTransactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
  } catch (error) {
    console.error('Error updating transaction:', error);
  }
};

export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    const existingTransactions = await getTransactions();
    const updatedTransactions = existingTransactions.filter((t) => t.id !== id);
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};

// User Data
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const updateBalance = async (amount: number): Promise<void> => {
  try {
    const userData = await getUserData();
    const currentBalance = userData?.balance ?? 0;
    const updatedUserData = { ...userData, balance: currentBalance + amount };
    await saveUserData(updatedUserData as UserData);
  } catch (error) {
    console.error('Error updating balance:', error);
  }
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  // For the MVP, we'll use a mock list of categories.
  // In a real app, this might be fetched from a server or stored in AsyncStorage.
  return Promise.resolve(MOCK_CATEGORIES);
};