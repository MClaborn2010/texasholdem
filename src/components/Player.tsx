// components/Player.tsx
import React from "react";
import Card from "./Card";

interface PlayerProps {
  name: string;
  hand: { suit: string; rank: string }[];
}

const Player: React.FC<PlayerProps> = ({ name, hand }) => {
  return (
    <div>
      <h3>{`${name}'s Hand`}</h3>
      {hand.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default Player;
