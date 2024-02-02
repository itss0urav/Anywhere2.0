import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from 'react-hot-toast';
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
import EditPostPage from "./pages/EditPostPage";
import PostFromCategory from "./pages/PostFromCategory";
import SearchPage from "./pages/SearchPage";
import AdminLogin from "./pages/AdminLogin";
import ReportPage from "./pages/ReportPage";
import UserProfile from "./pages/UserProfile";
import OtherUserProfile from "./pages/OtherUserProfile";

//components
import Mod from "./components/Mod";
// import Admin from "./components/Admin";
import { AdminWrapper } from "./components/AdminWrapper";
import CreatePostForm from "./components/CreatePostForm";
import VerificationForm from "./components/VerificationForm";

function App() {
  console.warn(
    "%cMessage from Anywhere Admin",
    "color: cyan; font-size: 15px;"
  );
  console.warn(
    "%cStop",
    "color: red; font-size: 15px;",
    'This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" someone\'s account, it is a scam and will give them access to your account.'
  );

  return (
    <div className="App">
       <Toaster />
      <BrowserRouter>
        <Routes>
          {/* pages */}
          <Route path="/Home" element={<Home />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Introduction />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="/posts/edit/:postId" element={<EditPostPage />} />
          <Route
            path="/posts/category/:category"
            element={<PostFromCategory />}
          />
          <Route path="/profile/:username" element={<OtherUserProfile />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          {/* Components */}
          <Route path="/modhome" element={<Mod />} />
          {/* <Route path="/adminhome" element={<Admin />} /> */}
          <Route path="/adminhome" element={<AdminWrapper />} />
          <Route path="/verification" element={<VerificationForm />} />
          <Route path="/createpostform" element={<CreatePostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
