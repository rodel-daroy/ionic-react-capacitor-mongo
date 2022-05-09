import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & { isLoggedIn: boolean };
export const ProtectedRoute = (props: ProtectedRouteProps): ReactElement => {
    return props.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};
