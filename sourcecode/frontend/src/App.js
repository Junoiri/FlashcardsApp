import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
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
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/flashcards/:id" element={<FlashcardViewer />} />
        <Route path="/library" element={<FlashcardLibrary />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="*" element={<ErrorPage />} /> Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
