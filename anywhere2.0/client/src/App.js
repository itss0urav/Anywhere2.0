import { BrowserRouter, Routes, Route } from "react-router-dom";
import TawkTo from "./config/TawkTo";
import { Toaster } from "react-hot-toast";
//pages
import Help from "./pages/Help";
import Home from "./pages/Home";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Explore from "./pages/Explore";
import PostView from "./pages/PostView";
import AboutPage from "./pages/AboutPage";
import AdminLogin from "./pages/AdminLogin";
import SearchPage from "./pages/SearchPage";
import ReportPage from "./pages/ReportPage";
import UserProfile from "./pages/UserProfile";
import Introduction from "./pages/Introduction";
import ServicesPage from "./pages/ServicesPage";
import EditPostPage from "./pages/EditPostPage";
import ContactUsPage from "./pages/ContactUsPage";
import OtherUserProfile from "./pages/OtherUserProfile";
import PostFromCategory from "./pages/PostFromCategory";
import PostFromCommunity from "./pages/PostFromCommunity";
import DiscoverZone from "./pages/DiscoverZone";

//components
import Mod from "./components/Mod";
import { UserWrapper } from "./components/UserWrapper";
import { AdminWrapper } from "./components/AdminWrapper";
import CreatePostForm from "./components/CreatePostForm";
import VerificationForm from "./components/VerificationForm";
import CreateCommunityForm from "./components/CreateCommunityForm";
function App() {
  console.log("%c[itss0urav]", "color: cyan; font-size: 15px;");
  console.warn(
    "%c[Stop]",
    "color: red; font-size: 15px;",
    '\nThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" someone\'s account, it is a scam and will give them access to your account.'
  );

  console.log(
    " Hi there 😄 Find me Here \n GitHub: 👉https://github.com/itss0urav",
    " \n LinkedIn: 👉https://www.linkedin.com/in/itssourav/",
    " \n Instagram: 👉https://www.instagram.com/itssourav.dev/",
    " \n Medium: 👉https://itss0urav.medium.com/"
  );

  return (
    <div className="App">
      <Toaster />
      <TawkTo />
      <BrowserRouter>
        <Routes>
          {/* pages */}
          <Route path="/Home" element={<UserWrapper />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Introduction />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/DiscoverZone" element={<DiscoverZone />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="/posts/edit/:postId" element={<EditPostPage />} />
          <Route
            path="/posts/category/:category"
            element={<PostFromCategory />}
          />
          <Route
            path="/posts/community/:communityName"
            element={<PostFromCommunity />}
          />
          <Route path="/profile/:username" element={<OtherUserProfile />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          {/* Components */}
          <Route path="/modhome" element={<Mod />} />
          <Route path="/adminhome" element={<AdminWrapper />} />
          <Route path="/verification" element={<VerificationForm />} />
          <Route path="/createpostform" element={<CreatePostForm />} />
          <Route path="/CreateCommunity" element={<CreateCommunityForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
