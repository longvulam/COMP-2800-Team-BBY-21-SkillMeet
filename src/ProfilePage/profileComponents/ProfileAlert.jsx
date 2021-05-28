import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

/**
 * Creats a Mui alert based on what is passed through the props
 * @param {*} props props passed into the function.
 * @returns an alert with the props
 */
export function ProfileAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
