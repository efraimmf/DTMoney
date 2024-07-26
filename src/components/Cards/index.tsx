import Image from "next/image";

interface CardData {
    title: string;
    price: string;
    icon: string;
    type?: 'default' | 'total';
}

interface CardsProps {
    cards: CardData[];
}

export function Cards({ cards }: CardsProps) {
    return (
        <div className={'flex justify-center gap-8 mt-[-70px]'}>
            {cards.map((card, index) => {
                const bgColor = card.type === 'total' ? 'bg-income-value' : 'bg-white';
                const textColor = card.type === 'total' ? 'text-white' : 'text-title';

                return (
                    <div
                        key={index}
                        className={`${bgColor} p-5 rounded-md shadow-md w-[352px] h-[136px]`}>
                        <header className={`flex items-center justify-between pl-2 mt-[-5px] ${textColor}`}>
                            {card.title}
                            <Image src={card.icon} alt={card.title} width={32} height={32} />
                        </header>
                        <h3 className={`block mt-6 text-4xl font-medium pl-2 ${textColor}`}>
                            {card.price}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
