import { Link } from "react-router-dom";

export default function SelectLevel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",        
        justifyContent: "center",     // מרכז אנכי
        width: "100vw",                // חשוב! כדי שהמרכז האופקי יעבוד
        height: "100vh",               // גובה מלא של המסך
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Welcome to Memory Game</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>Choose level:</p>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link
          to="/Board?level=hard"
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff6b6b",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Hard
        </Link>

        <Link
          to="/Board?level=medium"
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffa94d",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Medium
        </Link>

        <Link
          to="/Board?level=easy"
          style={{
            padding: "10px 20px",
            backgroundColor: "#51cf66",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Easy
        </Link>
      </div>
    </div>
  );
}
