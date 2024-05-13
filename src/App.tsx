import React, {useState} from 'react';
import './App.css';

import {LoginPage} from "./pages/LoginPage";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {MainPage} from "./pages/MainPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
  return (
      <BrowserRouter>
          <Routes>
          <Route path="/"
                 element={<LoginPage onLogin={handleLogin} />} />
          <Route
              path="/vkr"
              element={isLoggedIn ? <MainPage /> : <Navigate to="/" />}
            />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
