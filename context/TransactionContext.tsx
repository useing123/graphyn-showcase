import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, getTransactions, addTransaction as storageAddTransaction, deleteTransaction } from '../services/storage';

interface TransactionContextData {
  transactions: Transaction[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    const storedTransactions = await getTransactions();
    setTransactions(storedTransactions);
    setLoading(false);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { 
      ...transaction, 
      id: Date.now().toString() 
    };
    await storageAddTransaction(newTransaction);
    await loadTransactions();
  };

  const removeTransaction = async (id: string) => {
    await deleteTransaction(id);
    await loadTransactions();
  };

  return (
    <TransactionContext.Provider value={{ transactions, loading, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};