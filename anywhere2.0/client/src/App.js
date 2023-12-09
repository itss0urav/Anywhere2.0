import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Help from "./pages/Help";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Introduction from "./pages/Introduction";

//components
import CreatePostForm from "./components/CreatePostForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* pages */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Introduction />} />

          {/* Components */}
          <Route path="/createpostform" element={<CreatePostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
