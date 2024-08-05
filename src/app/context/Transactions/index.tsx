"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
    title: string;
    price: number;
    category: string;
    date: string;
    type: 'income' | 'outcome';
}

interface TransactionsContextData {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'date'>) => void;
    totals: { income: number; outcome: number; balance: number };
}

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = (transaction: Omit<Transaction, 'date'>) => {
        const newTransaction = { ...transaction, date: new Date().toLocaleDateString() };
        setTransactions([...transactions, newTransaction]);
    };

    const totals = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.price;
                acc.balance += transaction.price;
            } else {
                acc.outcome += transaction.price;
                acc.balance -= transaction.price;
            }
            return acc;
        },
        { income: 0, outcome: 0, balance: 0 }
    );

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction, totals }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionsProvider');
    }
    return context;
};
