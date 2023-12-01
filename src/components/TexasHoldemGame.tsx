// components/TexasHoldemGame.tsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Player from "./Player";

interface CardType {
  number: string;
  suit: string;
}

interface PlayerType {
  id: number;
  hand: CardType[];
}

interface TexasHoldemGameProps {}

const TexasHoldemGame: React.FC<TexasHoldemGameProps> = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const createDeck = (): CardType[] => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const numbers = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];

    const newDeck: CardType[] = [];

    for (const suit of suits) {
      for (const number of numbers) {
        newDeck.push({ number, suit });
      }
    }

    return newDeck;
  };

  useEffect(() => {
    // Set the deck when the component mounts
    setDeck(createDeck());
  }, []);

  useEffect(() => {
    // Function to shuffle the deck
    const shuffleDeck = (unshuffledDeck: CardType[]) => {
      const shuffledDeck = [...unshuffledDeck];
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      return shuffledDeck;
    };

    if (gameStarted && deck.length === 52) {
      // Shuffle the deck before starting a new game
      const shuffledDeck = shuffleDeck(deck);
      setDeck(shuffledDeck);

      const numberOfPlayers = parseInt(
        prompt("Enter the number of players (max 10):") || "0",
        10
      );

      if (
        isNaN(numberOfPlayers) ||
        numberOfPlayers < 1 ||
        numberOfPlayers > 10
      ) {
        alert("Please enter a valid number of players between 1 and 10.");
        return;
      }

      const newPlayers: PlayerType[] = [];

      for (let i = 1; i <= numberOfPlayers; i++) {
        const card1 = shuffledDeck.pop();
        const card2 = shuffledDeck.pop();

        // Check for duplicate cards among players
        if (
          !card1 ||
          !card2 ||
          newPlayers.some(
            (player) =>
              player.hand.some(
                (card) =>
                  card.number === card1.number && card.suit === card1.suit
              ) ||
              player.hand.some(
                (card) =>
                  card.number === card2.number && card.suit === card2.suit
              )
          )
        ) {
          alert(
            "Duplicate cards found. Please reshuffle and start a new game."
          );
          setGameStarted(false);
          setPlayers([]);
          setDeck(createDeck());
          return;
        }

        newPlayers.push({
          id: i,
          hand: [card1!, card2!],
        });
      }

      setPlayers(newPlayers);
    }
  }, [gameStarted, deck]);

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  return (
    <div className="text-black">
      <h2>Texas Hold'em Game</h2>
      {!gameStarted && (
        <button
          onClick={startGame}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Start Game
        </button>
      )}
      {gameStarted && (
        <div>
          {players.map((player) => (
            <div key={player.id}>
              <div className="flex flex-col items-center">
                <h3>Player {player.id}</h3>
                <div className="flex gap-2">
                  {player.hand.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TexasHoldemGame;
