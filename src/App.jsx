import "./App.css";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

function App() {
  // Protected route component to check if the user is authenticated
  const Protected = ({ children }) => {
    if (!auth.currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Authentication route component to redirect to Chat
  const CheckAuth = ({ children }) => {
    if (auth.currentUser) {
      return <Navigate to="/chat" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        ></Route>

        {/* Chat page */}
        <Route
          path="/chat"
          element={
            <Protected>
              <ChatPage />
            </Protected>
          }
        ></Route>

        {/* Redirect to login page for any other routes */}
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
