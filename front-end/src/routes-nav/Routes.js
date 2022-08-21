import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import Competition from "../items/Competition";
import Leagues from "../items/Leagues";
import Cups from "../__obsolete/Cups";

/** Side-wide routes. 
 * 
 * Parts of side should only be visitable when logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, id, season, setId, setSeason }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );
    
  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/competitions">
          <Competition season={season} league_id={id} setId={setId} setSeason={setSeason} />
        </PrivateRoute>

        <PrivateRoute exact path="/leagues">
          <Leagues season={season} league_id={id} setId={setId} setSeason={setSeason} />
        </PrivateRoute>

        <PrivateRoute exact path="/cups">
          <Cups season={season} cup_id={id} setId={setId} setSeason={setSeason} />
        </PrivateRoute>

        <PrivateRoute exact path="/link-3">
          <Link-3 />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;