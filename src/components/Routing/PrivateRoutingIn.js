import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../FirebaseComponents/firebaseFunctionsAuth";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";

const PrivateRoutingIn = ({ children, ...rest }) => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const { userData } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Route
      {...rest}
      render={() => {
        return userData && currentUser ? (
          children
        ) : (
          <Redirect to="/name-photo" />
        );
      }}
    />
  );
};

export default PrivateRoutingIn;
