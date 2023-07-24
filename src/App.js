// App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import UrlShort from "./components/createUrl";
import Data from "./components/Data/data";
import Dashboard from "./components/DashBoard/dashboard";
import SavePassword from "./components/savePass";
import ResetPassword from "./components/resetpass";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgetpassword" element={<ResetPassword />} />
          <Route path="/save-new-password/:resetToken" element={<SavePassword />} />
        </Routes>
      )}
      {isLoggedIn && (
        <>
          <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/urlShort" />} />
            <Route path="/CreateUrl" element={<UrlShort />} />
            <Route path="/AllUrl" element={<Data />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
