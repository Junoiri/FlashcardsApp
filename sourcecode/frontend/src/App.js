import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Create from "./pages/Create";
import FlashcardEditor from "./pages/FlashcardEditor";
import Learn from "./pages/Learn";
import FlashcardSetPreview from "./pages/FlashcardSetPreview"; // Import the new preview page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/create" element={<Create />} />
        <Route path="/editor" element={<FlashcardEditor />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/preview" element={<FlashcardSetPreview />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
