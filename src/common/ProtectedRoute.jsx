import React, { useState } from "react";
import { Route, useHistory } from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";
import { auth } from "../firebase";

export function ProtectedRoute(props) {
    const history = useHistory();
    const { children, ...rest } = props;
    const [isAuthenticating, setAuthentication] = useState(true);

    auth.onAuthStateChanged(user => {
        if (user) {
            setAuthentication(false);
        } else {
            history.push('/');
        }
    })

    return (
        isAuthenticating ? <LoadingSpinner /> :
        <Route {...rest}>
            {children}
        </Route>
    );
}
