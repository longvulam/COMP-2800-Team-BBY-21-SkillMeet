import React from 'react';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import { withRouter } from "react-router";

function CancelButton (props) {
  return (
    <Fab
      style={props.style}
      onClick={() => props.history.push("/profile")}
      color={''}
      >
      <CancelIcon/>
    </Fab>
  );
}

export default withRouter(CancelButton);