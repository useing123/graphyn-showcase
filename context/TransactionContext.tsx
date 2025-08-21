import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Transaction } from '../types/pennywise';
import {
  getTransactions,
  addTransaction as apiAddTransaction,
  updateTransaction as apiUpdateTransaction,
  deleteTransaction as apiDeleteTransaction,
  getBalance,
  getCategories,
  addCategory as apiAddCategory,
  deleteCategory as apiDeleteCategory,
} from '../services/api';
import { Category } from '@/types/pennywise';

interface TransactionContextData {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => Promise<void>;
  updateTransaction: (id: number, data: Partial<Omit<Transaction, 'id' | 'timestamp'>>) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  addCategory: (category: { name: string }) => Promise<void>;
  deleteCategory: (name: string) => Promise<void>;
  balance: number;
}

export const TransactionContext = createContext<TransactionContextData>({
  transactions: [],
  categories: [],
  loading: true,
  addTransaction: async () => {},
  updateTransaction: async () => {},
  deleteTransaction: async () => {},
  addCategory: async () => {},
  deleteCategory: async () => {},
  balance: 0,
});

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, []);

  useEffect(() => {
    loadBalance();
  }, [transactions]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const apiTransactions = await getTransactions();
      setTransactions(apiTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBalance = async () => {
    try {
      const fetchedBalance = await getBalance();
      setBalance(fetchedBalance);
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const apiCategories = await getCategories();
      setCategories(apiCategories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    try {
      await apiAddTransaction(transaction);
      await loadTransactions();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const updateTransaction = async (id: number, data: Partial<Omit<Transaction, 'id' | 'timestamp'>>) => {
    try {
      await apiUpdateTransaction(id, data);
      await loadTransactions();
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await apiDeleteTransaction(id);
      await loadTransactions();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const addCategory = async (category: { name: string }) => {
    try {
      await apiAddCategory(category);
      await loadCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const deleteCategory = async (name: string) => {
    try {
      await apiDeleteCategory(name);
      await loadCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        categories,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        deleteCategory,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};