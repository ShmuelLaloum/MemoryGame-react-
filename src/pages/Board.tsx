import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import type { CardType, ScoreType } from "../types/fieldTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Board() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const level = params.get("level") || "easy";
  const navigate = useNavigate();

  const baseEmojis = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍒",
    "🥝",
    "🍍",
    "🥑",
    "🍑",
    "🍋",
    "🍊",
    "🍐",
    "🍏",
    "🍈",
    "🥭",
    "🍅",
    "🥕",
  ];

  const [cards, setCards] = useState<CardType[]>([]);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [totalMatch, setTotalMatch] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [matched, setMatched] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [highScores, setHighScores] = useState<
    Record<string, ScoreType | null>
  >({
    easy: null,
    medium: null,
    hard: null,
  });

  useEffect(() => {
    const savedScores = localStorage.getItem("highScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    let rows = 4;
    let cols = 4;
    let chosen: string[] = [];

    if (level === "hard") {
      rows = 6;
      cols = 6;
      chosen = [...baseEmojis];
    } else if (level === "medium") {
      rows = 5;
      cols = 4;
      chosen = baseEmojis.slice(0, (rows * cols) / 2);
    } else {
      chosen = baseEmojis.slice(0, (rows * cols) / 2);
    }
    setTotalMatch(chosen.length);

    const doubled: CardType[] = chosen.flatMap((emoji, index) => [
      { id: index * 2, emoji, matched: false },
      { id: index * 2 + 1, emoji, matched: false },
    ]);

    setTime(0);
    setMoves(0);
    setMatched(0);
    setIsRunning(true);
    setCards(shuffle(doubled));
    setChoiceOne(null);
    setChoiceTwo(null);
  }, [level]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  function shuffle(array: CardType[]): CardType[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleChoice(card: CardType) {
    if (disabled) return;
    if (choiceOne && card.id === choiceOne.id) return;

    if (!choiceOne) setChoiceOne(card);
    else setChoiceTwo(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        setMatched((prev) => prev + 1);
        setCards((prev) =>
          prev.map((c) =>
            c.emoji === choiceOne.emoji ? { ...c, matched: true } : c
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (totalMatch === matched && totalMatch > 0) {
      setIsRunning(false);
      toast.success("🎉 ניצחת! כל הקלפים נמצאו 🎉", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate("/"),
      });

      const newScore: ScoreType = { moves, time };

      setHighScores((prev) => {
        const currentLevelScore = prev[level];
        if (
          !currentLevelScore ||
          newScore.moves < currentLevelScore.moves ||
          newScore.time < currentLevelScore.time
        ) {
          const updatedScores = { ...prev, [level]: newScore };
          localStorage.setItem("highScores", JSON.stringify(updatedScores));
          return updatedScores;
        }
        return prev;
      });
    }
  }, [matched]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          fontSize: "16px",
          textAlign: "right",
          zIndex: 1000,
        }}
      >
        {highScores[level] ? (
          <p>
            Best ({level}): {highScores[level]?.moves} moves in{" "}
            {Math.floor(highScores[level]?.time / 60)}:
            {String(highScores[level]?.time % 60).padStart(2, "0")}
          </p>
        ) : (
          <p>No high score yet</p>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxWidth: "1000px",
        }}
      >
        <h1 style={{ margin: "10px 0", textAlign: "center" }}>
          Level: {level}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          <p>Moves: {moves}</p>
          <p>
            Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "15px",
            justifyContent: "center",
            gridTemplateColumns:
              level === "hard"
                ? "repeat(6, minmax(0, 80px))"
                : level === "medium"
                ? "repeat(5, minmax(0, 100px))"
                : "repeat(4, minmax(0, 120px))",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                width: "100%",
                aspectRatio: level === "hard" ? "0.95 / 1" : "1 / 1",
                maxHeight: level === "hard" ? "75px" : "auto",
              }}
            >
              <Card
                card={card}
                handleClick={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
              />
            </div>
          ))}

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
