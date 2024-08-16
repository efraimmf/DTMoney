"use client";

import React, { useState, useEffect } from "react";
import { ITransaction } from "@/types/transaction";
import { useTransaction } from "@/hooks/useTransaction";
import Image from "next/image";

interface ModalProps {
    isUpdate?: boolean;
    transaction?: ITransaction;
    closeModal: () => void;
}

type NewTransaction = Omit<ITransaction, "id" | "createdAt" | "updatedAt">;

export default function Modal(modalProps: ModalProps) {
    const isUpdate = modalProps.isUpdate === undefined ? false : modalProps.isUpdate;
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<'income' | 'outcome' | undefined>(undefined);

    const { mutate: createTransaction } = useTransaction.CreateTransaction();
    const { mutate: updateTransaction } = useTransaction.UpdateTransaction();

    useEffect(() => {
        if (isUpdate && modalProps.transaction) {
            setTitle(modalProps.transaction.title);
            setPrice(modalProps.transaction.price.toString());
            setCategory(modalProps.transaction.category);
            setType(modalProps.transaction.type);
        }
    }, [isUpdate, modalProps.transaction]);

    const handleSaveTransaction = () => {
        const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        const transactionData: NewTransaction = {
            title,
            price: priceNumber,
            category,
            type: type || 'income',
        };

        if (isUpdate && modalProps.transaction) {
            const updatedTransaction: ITransaction = {
                ...(modalProps.transaction),
                title,
                price: priceNumber,
                category,
                type: type || 'income',
            };
            updateTransaction({ id: modalProps.transaction.id, formData: updatedTransaction });
        } else {
            createTransaction(transactionData as ITransaction);
        }

        modalProps.closeModal();
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75">
            <div className="relative w-[576px] h-[588px] bg-modal rounded-lg shadow-xl overflow-hidden flex flex-col">
                <button
                    onClick={modalProps.closeModal}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ×
                </button>
                <div className="p-8 flex-1">
                    <h3 className="text-2xl font-semibold leading-6 text-title mb-6 ml-6 mt-8">
                        {isUpdate ? "Editar Transação" : "Cadastrar Transação"}
                    </h3>
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
                                className={`flex items-center justify-center w-[236px] h-[64px] p-3 border rounded-md ${type === 'income' ? 'bg-green-200' : 'text-title hover:bg-green-200'}`}
                            >
                                <Image src="/images/Entradas.png" alt="Entrada" width={24} height={24} />
                                <span className="ml-2">Entrada</span>
                            </button>
                            <button
                                onClick={() => setType('outcome')}
                                className={`flex items-center justify-center w-[236px] h-[64px] p-3 border rounded-md ${type === 'outcome' ? 'bg-red-200' : 'text-title hover:bg-red-200'}`}
                            >
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
                    <button
                        onClick={handleSaveTransaction}
                        className="w-[480px] h-[64px] bg-income-value text-white font-semibold rounded-md hover:bg-green-700"
                    >
                        {isUpdate ? "Atualizar" : "Cadastrar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
