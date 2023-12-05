import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Introduction from "./pages/Introduction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Introduction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
