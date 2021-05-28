import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

/** functional component that creats an alert based on the props passed to it.*/
export function EditProfileAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
