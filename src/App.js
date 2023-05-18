import { BrowserRouter, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import UploadPic from "./UploadPic";
import LinkPage from "./LinkPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import CreatePage from './CreatePage';
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";
import NavBar from "./Navbar";

const verifyTokenAPIURL = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/verify';

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'NNc9uvTM9c3LFRuiaUgQM90MUlO3z5cJ59ulXah8'
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })
  }, []);

  const token = getToken();

  if (isAuthenticating && token) {
    return <div className="content"> Authenticating... </div>
  }

  return (
    <div className="App">
      <BrowserRouter>
       <NavBar />

        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/Login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/uploadpic"
              element={
                <PrivateRoute>
                  <UploadPic />
                </PrivateRoute>
              }
            />

            <Route
              path="/createpage"
              element={
                <PrivateRoute>
                  <CreatePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/linkpage"
              element={
                <PrivateRoute>
                  <LinkPage />
                </PrivateRoute>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
