import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/app',
});

export interface Transaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    createdAt?: string;
    type: 'income' | 'outcome';
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
    try {
        const response = await api.get('/transactions');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
};

export const addTransaction = async (transaction: Omit<Transaction, 'createdAt'>): Promise<Transaction> => {
    try {
        const response = await api.post('/transaction', transaction);
        return response.data;
    } catch (error) {
        console.error('Failed to add transaction:', error);
        throw new Error('Failed to add transaction');
    }
};
