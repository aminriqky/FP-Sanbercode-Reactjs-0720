import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "./contextLib";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}`
        } />
      )}
    </Route>
  );
}