import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ authenticated, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/join",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default ProtectedRoute;