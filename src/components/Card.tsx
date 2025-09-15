import React from "react";

type CardProps = {
  text: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ text, onClick }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        border: "1px solid #333",
        borderRadius: "6px",
        padding: "12px 16px",
        margin: "6px",
        cursor: onClick ? "pointer" : "default",
        background: "#fff",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        fontSize: "1rem",
        minWidth: "80px",
        textAlign: "center",
        flex: "1 0 30%" // スマホで3列くらいに並ぶ
      }}
    >
      {text}
    </div>
  );
};

export default Card;
