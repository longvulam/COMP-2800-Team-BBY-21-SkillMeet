import React from 'react';
import Fab from '@material-ui/core/Fab';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


export default function AddFriendButton (props) {
  
    return (
      <>
      <Fab
        style={props.style}
        >
        <CancelOutlinedIcon/>
      </Fab>
      </>
    );
  }