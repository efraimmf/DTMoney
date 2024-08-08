import {useMutation, useQuery, useQueryClient} from "react-query";
import {ApiTransaction} from "@/app/service/transaction";

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

export const useTransaction = {
    CreateTransaction,
    GetAllTransaction,
}