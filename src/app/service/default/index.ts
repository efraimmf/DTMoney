import {api} from "@/app/service/api";


export class DefaultApi<T> {
    constructor(protected endpoint: string, protected resourceId: string) {}


    getAllTransaction = async (): Promise<T[]> => {
        const { data } = await api.get<T[]>(`${this.endpoint}/`)
        return data
    }

    createTransaction = async (formData: T): Promise<T> => {
        const { data } = await api.post<T>(`${this.endpoint}`, formData)
        return data
    }

    updateTransaction = async (id: string, formData: T): Promise<T> => {
        const {data} = await api.put<T>(`${this.endpoint}/${id}`, formData)
        return data
    }

    deleteTransaction = async (id: string): Promise<void> => {
        await  api.delete<T>(`${this.endpoint}/${id}`)
    }
}