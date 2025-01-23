import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
// import Upload from "./pages/Upload";
// import FlashcardViewer from "./pages/FlashcardViewer";
// import FlashcardLibrary from "./pages/FlashcardLibrary";
// import About from "./pages/About";
// import Features from "./pages/Features";
// import Contact from "./pages/Contact";
// import Settings from "./pages/Settings";
// import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
}

export default App;
