import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Help from "./pages/Help";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Introduction from "./pages/Introduction";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import ServicesPage from "./pages/ServicesPage";
import PostView from "./pages/PostView";

//components
import CreatePostForm from "./components/CreatePostForm";
import IntroComponent from "./components/IntoComponent";

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
          <Route path="/About" element={<AboutPage />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/Services" element={<ServicesPage />} />

          {/* Components */}
          <Route path="/createpostform" element={<CreatePostForm />} />

          {/* Test Components */}
          <Route path="/IntroComponent" element={<IntroComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
