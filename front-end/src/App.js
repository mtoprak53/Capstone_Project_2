import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import FootyApi from "./api/api";
import UserContext from "./auth/userContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "footy-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token, 
  // this should not run. It only needs to re-run when a user logs out, so 
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          FootyApi.token = token;
          let currentUser = await FootyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the 
    // data is fetched (or even if an error happens!), this will be set back 
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  
  /** Handles site-wide signup.
   * 
   * Automatically logs them in (set token) upon signup.
   * 
   * Make sure you await this function and check its return value! 
   */
  async function signup(signupData) {
    try {
      let token = await FootyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  
  /** Handles site-wide login.
   * 
   * Make sure you await this function and check its retrun value!
   */
  async function login(loginData) {
    try {
      let token = await FootyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  
  if (!infoLoaded) return <LoadingSpinner />;
  
  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;