/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React from "react";
import { Route, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Functional component built using Material UI components 
 * to create a Public Route. Redirects logged in users to profile.
 */
export default function PublicRoute(props) {
    const history = useHistory();
    const { children, ...rest } = props;
    const [isAuthenticating, setIsAuthenticating] = React.useState(true);

    auth.onAuthStateChanged(user => {
        if (!user) {
            setIsAuthenticating(false);
        } else {
            history.push('/profile');
        }
    });

    return (
        isAuthenticating ? <LoadingSpinner /> :
            <Route {...rest}>
                {children}
            </Route>
    );
}
