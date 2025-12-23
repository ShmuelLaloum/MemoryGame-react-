import { Link } from "react-router-dom";
import type { field } from "../types/fieldTypes";
export default function SelectLevel() {
  const fields: field[] = [
    { name: "easy", color: "#51cf66" },
    { name: "medium", color: "#ffa94d" },
    { name: "hard", color: "#ff6b6b" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        width: "100vw", 
        height: "100vh", 
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        Welcome to Memory Game
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>Choose level:</p>

      <div style={{ display: "flex", gap: "15px" }}>
        {fields.map((field) => (
          <Link
            key={field.name}
            to={`/Board?level=${field.name}`}
            style={{
              padding: "10px 20px",
              backgroundColor: field.color,
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {field.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
