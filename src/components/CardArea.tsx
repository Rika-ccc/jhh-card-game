// CardArea.tsx
import React from "react";

type Props = {
  cards: string[];
  onCardClick?: (word: string) => void;
  autoResize?: boolean;
};

const CardArea: React.FC<Props> = ({ cards, onCardClick, autoResize }) => {
  return (
    <>
      {cards.map((word, i) => (
        <div
          key={i}
          onClick={() => onCardClick && onCardClick(word)}
          style={{
            flex: autoResize ? "1 1 auto" : "0 0 auto", // 横並び時はサイズ自動調整
            maxWidth: "100px",
            minWidth: "60px",
            height: "90px",
            background: "#fff",
            border: "2px solid #333",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: onCardClick ? "pointer" : "default",
            fontSize: "0.9rem",
            textAlign: "center",
            padding: "4px",
            boxSizing: "border-box",
            wordBreak: "keep-all",
            overflow: "hidden",
          }}
        >
          {word}
        </div>
      ))}
    </>
  );
};

export default CardArea;
