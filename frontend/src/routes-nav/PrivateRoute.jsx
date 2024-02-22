import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/userContext";

/** "Higher-Order Component" for private routes. 
 * 
 * In routing component, use these instead of <Route ...>. This component 
 * will check if there is a valid current user and only continues to the 
 * roiute if so. If no user present, redirects to login form.
 */

function PrivateRoute({
  redirectPath="/login", 
  children
}) {
  const { currentUser } = useContext(UserContext);

  console.debug(
      "PrivateRoute",
      // "exact=", exact,
      "redirectPath=", redirectPath,
      "currentUser=", currentUser,
  );

  if (!currentUser) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;
