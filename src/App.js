import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./page/header";
import Login from "./page/login";
import React from "react";
import Sign from "./page/sign";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/authContext";
import Chapters from "./components/Quran/Chapters";
import Res from "./page/RM";
import Profile from "./page/profile";
import CompanyProfile from "./page/part2/CompanyProfile";
import UserProfile from "./page/part2/UserProfile";
import Learn from "./page/learnMore/learn";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Sign />} />
          <Route path="/quran" element={<Chapters />} />
          <Route path="/find" element={<Res />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company-setup" element={<CompanyProfile />} />
          <Route path="/profile-setup" element={<UserProfile />} />
          <Route path="/om-islam" element={<Learn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
