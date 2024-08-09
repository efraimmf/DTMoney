import {ITransaction} from "@/types/transaction";

interface Totals {
    income: number;
    outcome: number;
    balance: number;
}

export const calculateTotals = (transactions: ITransaction[]): Totals => {
    return transactions.reduce(
        (acc, transaction) =>{
            if (transaction.type == "income"){
                acc.income += transaction.price;
            }else if (transaction.type == "outcome"){
                acc.outcome+=transaction.price;
            }
            acc.balance = acc.income - acc.outcome;
            return acc;
        },
        {income: 0, outcome: 0, balance: 0},
    );
};

export const formatDate = (dateString?: string) =>{
    const date = new Date(dateString!);
    return date.toLocaleDateString('pt-BR')
}