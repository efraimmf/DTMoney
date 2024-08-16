import {useMutation, useQuery, useQueryClient} from "react-query";
import {ApiTransaction} from "@/app/service/transaction";
import {ITransaction} from "@/types/transaction";

const QUERY_KEY = 'qkTransaction'

const CreateTransaction = () => {
    const queryClient = useQueryClient()

    return useMutation(ApiTransaction.createTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
    })
}

const GetAllTransaction = () => {
    return useQuery([QUERY_KEY], () => ApiTransaction.getAllTransaction())
}

const UpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation(({ id, formData }: { id: string; formData: ITransaction }) =>
        ApiTransaction.updateTransaction(id, formData), {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY);
        }
    });
};

const DeleteTransaction = () => {
    const queryClient = useQueryClient()

    return useMutation(ApiTransaction.deleteTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
    })
}


export const useTransaction = {
    CreateTransaction,
    GetAllTransaction,
    UpdateTransaction,
    DeleteTransaction
}