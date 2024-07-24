import Image from "next/image";

interface CardData {
    title: string;
    price: string;
    icon: string;
    bgColor?: string;
    textColor?: string;
}

interface CardsProps {
    cards: CardData[];
}

export function Cards({ cards }: CardsProps) {
    return (
        <div className={'flex justify-center gap-8 mt-[-70px]'}>
            {cards.map((card, index) => (
                <div key={index} className={`${card.bgColor || 'bg-white'} p-5 rounded-md shadow-md w-[352px] h-[136px]`}>
                    <header className={`flex items-center justify-between pl-2 mt-[-5px] ${card.textColor || 'text-title'}`}>
                        {card.title}
                        <Image src={card.icon} alt={card.title} width={32} height={32}/>
                    </header>
                    <p className={`block mt-6 text-4xl font-medium pl-2 ${card.textColor || 'text-title'}`}> {card.price} </p>
                </div>
            ))}
        </div>
    );
}
