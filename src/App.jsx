import "./App.css";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<ChatPage />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
