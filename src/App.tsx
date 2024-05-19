import React, {useState} from 'react';
import './App.css';

import {LoginPage} from "./pages/LoginPage";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import styled from "styled-components";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
  return (
      <StyledApp>
          <BrowserRouter>
              <Routes>
                  {/*<Route path="/"*/}
                  {/*       element={<LoginPage onLogin={handleLogin} />} />*/}
                  <Route
                      path="/vkr"
                      element={isLoggedIn ? <MainPage /> : <Navigate to="/" />}
                    />

                  <Route path={"/" } element={<MainPage />}/>
            </Routes>
          </BrowserRouter>
      </StyledApp>
  );
}

const StyledApp = styled.div `
  min-width: 100vw;
  min-height: 100vh;


`


export default App;
