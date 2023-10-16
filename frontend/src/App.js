import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { history } from "./helpers/history";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
