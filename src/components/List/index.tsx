"use client"

import React from "react";
import { useTransactions } from "@/app/context/Transactions";

export default function List() {
    const { transactions } = useTransactions();

    return (
        <div className="container mx-auto p-4">
            {transactions.length > 0 && (
                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                    <tr>
                        <th className="text-left text-list-header p-2 pl-10">Título</th>
                        <th className="text-left text-list-header p-2">Preço</th>
                        <th className="text-left text-list-header p-2">Categoria</th>
                        <th className="text-left text-list-header p-2">Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className="bg-white shadow-md h-[64px]">
                            <td className="text-title p-4 pl-10">{transaction.title}</td>
                            <td className={`p-4 ${transaction.type === 'income' ? 'text-income-value' : 'text-outcome'}`}>
                                {transaction.type === 'outcome' ? '- ' : ''}
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.price)}
                            </td>
                            <td className="text-list-header p-4">{transaction.category}</td>
                            <td className="text-list-header p-4">{transaction.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
