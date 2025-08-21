import axios from 'axios';
import { Transaction } from '../types/pennywise';

const API_BASE_URL = 'http://127.0.0.1:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transaction Service
export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data.transactions || [];
};

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'timestamp'>): Promise<Transaction> => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};

export const updateTransaction = async (id: number, data: Partial<Omit<Transaction, 'id' | 'timestamp'>>): Promise<Transaction> => {
  const response = await api.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: number): Promise<{ status: string }> => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

export const getBalance = async (): Promise<number> => {
  const response = await api.get('/transactions/balance');
  return response.data.balance || 0;
};

// Chat Service
export const sendChatMessage = async (message: string, sessionId: string): Promise<{ response: string }> => {
  const response = await api.post('/insights/chat', { message, sessionId });
  return response.data;
};

// Category Service
export const getCategories = async (): Promise<any[]> => {
  const response = await api.get('/categories');
  return response.data.categories || [];
};

export const addCategory = async (category: { name: string }): Promise<any> => {
  const response = await api.post('/categories', category);
  return response.data;
};

export const deleteCategory = async (name: string): Promise<{ status: string }> => {
  const response = await api.delete(`/categories/${name}`);
  return response.data;
};