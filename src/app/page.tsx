import Header from "@/components/Header";
import Cards from "@/components/Cards";
import List from "@/components/List";
import {TransactionsProvider} from "@/app/context/Transactions";

export default function Home() {
    return (
        <TransactionsProvider>
            <Header />
            <Cards />
            <List />
        </TransactionsProvider>
    );
}
