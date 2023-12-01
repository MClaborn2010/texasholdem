// components/Card.tsx
import React from "react";
import Image from "next/image";
import heart from "../../public/heart-svgrepo-com.svg";
import diamond from "../../public/diamond-svgrepo-com.svg";
import spade from "../../public/spade-svgrepo-com.svg";
import club from "../../public/club-svgrepo-com.svg";

interface CardProps {
  number: string;
  suit: string;
}

const getSuitIcon = (suit: string) => {
  switch (suit) {
    case "Hearts":
      return heart;
    case "Diamonds":
      return diamond;
    case "Spades":
      return spade;
    case "Clubs":
      return club;
    default:
      return null; // You might want to handle an unknown suit differently
  }
};

const Card: React.FC<CardProps> = ({ number, suit }) => {
  const suitIcon = getSuitIcon(suit);

  return (
    <div className="border-2 border-black rounded-md justify-between flex-col p-2 h-60 w-40 flex">
      <div className="flex flex-col text-black">
        <p>{number}</p>
        {suitIcon && <Image width={20} src={suitIcon} alt="suit" />}
      </div>
      <div className="flex flex-col items-end text-black">
        <p>{number}</p>
        {suitIcon && (
          <p>
            <Image width={20} src={suitIcon} alt="suit" />
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
