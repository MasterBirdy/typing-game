import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
    authenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authenticated, ...restOfProps }) => {
    return authenticated ? <Route {...restOfProps} /> : <Redirect to={"/"} />;
};

export default ProtectedRoute;
