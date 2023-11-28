import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./page/header";
import Login from "./page/login";
import React from "react";
import Sign from "./page/sign";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/authContext";
import Chapters from "./components/Quran/Chapters";
import Res from './page/RM'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Sign />} />
          < Route path="/quran" element={<Chapters />}/>
          < Route path="/find" element={<Res />}/>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
