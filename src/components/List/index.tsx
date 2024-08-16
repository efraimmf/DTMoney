"use client";

import { useState } from "react";
import { useTransaction } from "@/hooks/useTransaction";
import { formatDate } from "@/utils";

import Image from "next/image";
import { ITransaction } from "@/types/transaction";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/DeleteModal";

export default function List() {
    const { data: transactions = [] } = useTransaction.GetAllTransaction();
    const deleteMutation = useTransaction.DeleteTransaction();
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | undefined>(undefined);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openUpdateModal = (transaction: ITransaction) => {
        setSelectedTransaction(transaction);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedTransaction(undefined);
    };

    const openDeleteModal = (transaction: ITransaction) => {
        setSelectedTransaction(transaction);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedTransaction(undefined);
    };

    const confirmDelete = () => {
        if (selectedTransaction) {
            deleteMutation.mutate(selectedTransaction.id);
            closeDeleteModal();
        }
    };

    return (
        <div className="container mx-auto p-4">
            {isUpdateModalOpen && (
                <Modal
                    isUpdate={true}
                    transaction={selectedTransaction}
                    closeModal={closeUpdateModal}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    closeModal={closeDeleteModal}
                    confirmDelete={confirmDelete}
                />
            )}

            {transactions.length > 0 ? (
                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                    <tr>
                        <th className="text-left text-list-header p-2 pl-10">Título</th>
                        <th className="text-left text-list-header p-2">Preço</th>
                        <th className="text-left text-list-header p-2">Categoria</th>
                        <th className="text-left text-list-header p-2">Data</th>
                        <th className="text-left text-list-header p-2">Opções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="bg-white shadow-md h-[64px]">
                            <td className="text-title p-4 pl-10">{transaction.title}</td>
                            <td className={`p-4 ${transaction.type === 'income' ? 'text-income-value' : 'text-outcome'}`}>
                                {transaction.type === 'outcome' ? '- ' : ''}
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.price)}
                            </td>
                            <td className="text-list-header p-4">{transaction.category}</td>
                            <td className="text-list-header p-4">{formatDate(transaction.createdAt)}</td>
                            <td className="text-list-header p-4 flex items-center gap-2">
                                <button onClick={() => openUpdateModal(transaction)}>
                                    <Image src="/images/edit.png" alt="Editar" width={30} height={30} />
                                </button>
                                <button onClick={() => openDeleteModal(transaction)}>
                                    <Image src="/images/delete.png" alt="Excluir" width={30} height={30} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-500">Nenhuma transação encontrada.</div>
            )}
        </div>
    );
}
