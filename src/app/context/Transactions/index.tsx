"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { addTransaction, fetchTransactions, Transaction } from "@/app/service/api";

interface TransactionsContextData {
    transactions: Transaction[];
    addTransaction: (transaction: {
        title: string;
        price: number;
        category: string;
        type: 'income' | 'outcome';
    }) => Promise<void>;
    totals: { income: number; outcome: number; balance: number };
}

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totals, setTotals] = useState({ income: 0, outcome: 0, balance: 0 });

    let loadTransactions: () => Promise<void>;
    loadTransactions = async () => {
        try {
            const transactions = await fetchTransactions();
            setTransactions(transactions);
            calculateTotals(transactions);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        }
    };

    const calculateTotals = (transactions: Transaction[]) => {
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
        setTotals(totals);
    };

    const handleAddTransaction = async (transaction: Omit<Transaction, 'createdAt'>) => {
        try {
            const newTransaction = await addTransaction(transaction);
            setTransactions(prev => [...prev, newTransaction]);
            calculateTotals([...transactions, newTransaction]);
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction: handleAddTransaction, totals }}>
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
