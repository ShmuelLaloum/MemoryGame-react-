import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import SelectLevel from "./pages/SelectLevel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectLevel />} />
        <Route path="/Board" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
