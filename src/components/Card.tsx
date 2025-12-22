import type { CardProps } from "../types/fieldTypes";

export default function Card({ card, handleClick, flipped }: CardProps) {
  return (
    <div
      onClick={() => handleClick(card)}
      style={{
        width: "60px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        cursor: flipped || card.matched ? "default" : "pointer",
        backgroundColor: flipped || card.matched ? "#fff" : "#555",
        border: "2px solid #000",
        borderRadius: "5px",
        margin: "5px",
        userSelect: "none",
      }}
    >
      {flipped || card.matched ? card.emoji : "❓"}
    </div>
  );
}
