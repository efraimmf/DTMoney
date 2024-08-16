import React from "react";

interface DeleteConfirmationModalProps {
    closeModal: () => void;
    confirmDelete: () => void;
}

export default function DeleteModal({ closeModal, confirmDelete }: DeleteConfirmationModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold leading-6 text-title text-center mt-8">
                    Deseja Excluir Transação?
                </h2>
                <div className="flex justify-center mt-8">
                    <button onClick={closeModal} className="w-[480px] h-[64px] bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-700">
                        Cancelar
                    </button>
                </div>

                <div className="flex justify-center mt-4">
                    <button onClick={confirmDelete} className="w-[480px] h-[64px] bg-outcome text-white font-semibold rounded-md hover:bg-red-700">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
