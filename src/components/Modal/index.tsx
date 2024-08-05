"use client"

import { useState } from "react";
import Image from "next/image";

interface ModalProps {
    closeModal: () => void;
    addTransaction: (transaction: {
        title: string;
        price: number;
        category: string;
        type: "income" | "outcome" }) => void;
}

export default function Modal(modalProps: ModalProps) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'income' | 'outcome'>();

    const handleAddTransaction = () => {
        const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g,""));
        if (isNaN(priceNumber)) {
            alert('Preço inválido');
            return;
        }
        modalProps.addTransaction({
            title,
            price: priceNumber,
            category,
            type: type ?? 'income',
        });
        modalProps.closeModal();
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75">
            <div className="relative w-[576px] h-[588px] bg-modal rounded-lg shadow-xl overflow-hidden flex flex-col">
                <button
                    onClick={modalProps.closeModal}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 text-2xl">
                    &times;
                </button>
                <div className="p-8 flex-1">
                    <h3 className="text-2xl font-semibold leading-6 text-title mb-6 ml-6 mt-8">Cadastrar Transação</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                className="w-[480px] h-[64px] p-3 border rounded-md text-gray-700 placeholder-gray-500 bg-input"
                                placeholder="Nome"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                className="w-[480px] h-[64px] p-3 border rounded-md text-gray-700 placeholder-gray-500 bg-input"
                                placeholder="Preço"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <button
                                onClick={() => setType('income')}
                                className={`flex items-center justify-center w-[236px] h-[64px] p-3 border rounded-md ${type === 'income' ? 'bg-green-200' : 'text-title hover:bg-green-200'}`}>
                                <Image src="/images/Entradas.png" alt="Entrada" width={24} height={24}/>
                                <span className="ml-2">Entrada</span>
                            </button>
                            <button
                                onClick={() => setType('outcome')}
                                className={`flex items-center justify-center w-[236px] h-[64px] p-3 border rounded-md ${type === 'outcome' ? 'bg-red-200' : 'text-title hover:bg-red-200'}`}>
                                <Image src="/images/Saídas.png" alt="Saída" width={24} height={24} />
                                <span className="ml-2">Saída</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                className="w-[480px] h-[64px] p-3 border rounded-md text-gray-700 placeholder-gray-500 bg-input"
                                placeholder="Categoria"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="py-7 px-8 flex items-center justify-center">
                    <button onClick={handleAddTransaction} className="w-[480px] h-[64px] bg-income-value text-white font-semibold rounded-md hover:bg-green-700">Cadastrar</button>
                </div>
            </div>
        </div>
    );
}