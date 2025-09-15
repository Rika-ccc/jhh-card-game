import React from "react";
import Card from "./Card";

type CardAreaProps = {
  cards: string[];
  onCardClick?: (word: string) => void;
};

const CardArea: React.FC<CardAreaProps> = ({ cards, onCardClick }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center"
      }}
    >
      {cards.map((word, i) => (
        <Card
          key={i}
          text={word}
          onClick={onCardClick ? () => onCardClick(word) : undefined}
        />
      ))}
    </div>
  );
};

export default CardArea;
