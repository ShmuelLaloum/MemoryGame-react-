import type { CardProps } from "../types/fieldTypes";
import "../styles/MemoryGame.css"

export default function Card({ card, handleClick, flipped }: CardProps) {
  return (
    <div
      onClick={() => {
        if (!flipped && !card.matched) {
          handleClick(card);
        }
      }}
      className={`card ${flipped ? "flipped" : ""} ${
        card.matched ? "matched" : ""
      }`}
    >
      {flipped || card.matched ? card.emoji : "❓"}
    </div>
  );
}
