import { Header } from "@/components/Header";
import { Cards } from "@/components/Cards";
import { cardData } from "@/data/cardData";

export default function Home() {
    return (
        <>
            <Header />
            <Cards cards={cardData}/>
        </>
    );
}