import { Header } from "@/components/Header";
import { Cards } from "@/components/Cards";

const cardData = [
    {
        title: "Entradas",
        price: "R$ 17.400,00",
        icon: "/images/Entradas.png"
    },

    {
        title: "Saídas",
        price: "R$ 1.259,00",
        icon: "/images/Saídas.png"
    },

    {
        title: "Total",
        price: "R$ 16.141,00",
        icon: "/images/Total.png",
        bgColor: "bg-income-value",
        textColor: "text-white"
    }
];

export default function Home() {
    return (
        <>
            <Header/>
            <Cards cards={cardData}/>
        </>
    );
}