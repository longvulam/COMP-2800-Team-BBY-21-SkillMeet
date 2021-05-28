/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React, { useState } from "react";
import { Route, useHistory } from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";
import { auth } from "../firebase";

/**
 * Functional component built using Material UI components 
 * to create a Route for authorized users. Redirects all other users.
 */
export default function ProtectedRoute(props) {
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
