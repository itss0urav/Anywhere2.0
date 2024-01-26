// import { useState } from "react";
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
import PostFromCategory from "./pages/PostFromCategory"; // Import the new page
import SearchPage from "./pages/SearchPage";
import AdminLogin from "./pages/AdminLogin";
import ReportPage from "./pages/ReportPage";
import UserProfile from "./pages/UserProfile";
import OtherUserProfile from "./pages/OtherUserProfile"


//components
import CreatePostForm from "./components/CreatePostForm";
import Admin from "./components/Admin";
import VerificationForm from "./components/VerificationForm";
import Mod from "./components/Mod";

//context
// import GlobalContext from "./contexts/Context";
function App() {
  // const [user, setUser] = useState(SessionStorageData);
  // const dataExpanded = {
  //   user,
  //   setUser,
  // };
  return (
    <div className="App">
      <BrowserRouter>
        {/* <GlobalContext.Provider value={dataExpanded}> */}
        <Routes>
          {/* pages */}
          <Route path="/Home" element={<Home />} />
          <Route path="/modhome" element={<Mod />} />
          <Route path="/verification" element={<VerificationForm />} />
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/adminhome" element={<Admin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Introduction />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="/profile/:username" element={<OtherUserProfile />} />
          <Route
            path="/posts/category/:category"
            element={<PostFromCategory />}
          />{" "}
          {/* Add this line */}
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          {/* Components */}
          <Route path="/createpostform" element={<CreatePostForm />} />
          
        </Routes>
        {/* </GlobalContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
