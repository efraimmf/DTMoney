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
}