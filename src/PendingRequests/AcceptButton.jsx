import React from 'react';
import Fab from '@material-ui/core/Fab';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';


export default function AddFriendButton (props) {
  
    return (
      <>
      <Fab
        style={props.style}
        >
        <CheckCircleOutlinedIcon/>
      </Fab>
      </>
    );
  } 