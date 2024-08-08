"use client"

import Image from "next/image";

import {calculateTotals} from "@/utils";
import {useTransaction} from "@/hooks/useTransaction";


export default function Cards() {
    const {data: transactions = []} = useTransaction.GetAllTransaction ();
    const totals = calculateTotals(transactions)

    const cards = [
        {
            title: "Entradas",
            price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totals.income),
            icon: "/images/Entradas.png",
            type: "default"
        },
        {
            title: "Saídas",
            price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totals.outcome),
            icon: "/images/Saídas.png",
            type: "default"
        },
        {
            title: "Saldo",
            price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totals.balance),
            icon: "/images/Total.png",
            type: "total",
            isNegative: totals.balance < 0
        }
    ];

    return (
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-[-70px]">
            {cards.map((card, index) => {
                let bgColor;
                let textColor;

                if (card.type === 'total') {
                    bgColor = card.isNegative ? 'bg-red-500' : 'bg-income-value';
                    textColor = 'text-white';
                } else {
                    bgColor = 'bg-white';
                    textColor = 'text-title';
                }

                return (
                    <div key={index} className={`${bgColor} p-5 rounded-md shadow-md w-full md:w-[352px] h-[136px]`}>
                        <header className={`flex items-center justify-between pl-2 mt-[-5px] ${textColor}`}>
                            {card.title}
                            <Image src={card.icon} alt={card.title} width={32} height={32} />
                        </header>
                        <h3 className={`block mt-6 text-4xl font-medium pl-2 ${textColor}`}>
                            {card.price}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
