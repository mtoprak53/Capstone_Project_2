import React from "react";
// import { React, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
// import AnonymousRoute from "./AnonymousRoute";
import PrivateRoute from "./PrivateRoute";
import Competition from "../items/Competition";
// import Competition2 from "../items/Competition2";
// import Leagues from "../items/Leagues";
// import Cups from "../__obsolete/Cups";
// import CupRound from "../items/CupRound";
// import Team from "../items/Team";
import Teams from "../items/Teams";
// import Home from "../items/maybe/Home";
// import ErrorPage from "../common/ErrorPage";
import { 
  defaultTeamId, 
  defaultLeagueId, 
  defaultCupId, 
  defaultSeason 
} from "../config";

/** Side-wide routes. 
 * 
 * Parts of side should only be visitable when logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * Visiting a non-existant route redirects to the homepage.
 */

function MyRoutes({ login, signup }) {
  console.debug(
      "MyRoutes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );
  // element={} /
  return (
    <div className="pt-5">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginForm login={login} />} />
        <Route exact path="/signup" element={<SignupForm signup={signup} />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/teams/:teamId" element={<Teams />} />
          {/* <Route path="/teams" element={<Navigate to={`/teams/${defaultTeamId}`} />} /> */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/league/:id/:season" element={<Competition type="league" />} />
          {/* <Route path="/league" element={<Navigate to={`/league/${defaultLeagueId}/${defaultSeason}`} />} /> */}
          <Route path="/league" element={<Navigate to={`/league/${defaultLeagueId}/${defaultSeason}`} />} />
          <Route path="cup/:id/:season" element={<Competition type="cup" />} />
          <Route path="/cup" element={<Navigate to={`/cup/${defaultCupId}/${defaultSeason}`} />} />

        </Route>


        {/* <Route exact path="/teams/:teamId" element={<PrivateRoute />}>
        </Route>

        <Route exact path="/teams" element={<PrivateRoute />}>
        </Route>

        <Route exact path="/league/:id/:season" element={<PrivateRoute />}>
        </Route>

        <Route exact path="/league" element={<PrivateRoute />}>
        </Route>

        <Route exact path="cup/:id/:season" element={<PrivateRoute />}>
        </Route>

        <Route exact path="/cup" element={<PrivateRoute />}>
        </Route> */}

        <Route exact element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default MyRoutes;