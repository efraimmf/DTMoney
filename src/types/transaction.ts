export interface ITransaction {
    id: string;
    title: string;
    price: number;
    category: string;
    createdAt: string;
    type: "income" | "outcome";
}