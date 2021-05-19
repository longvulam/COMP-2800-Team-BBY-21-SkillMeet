import React from 'react';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function AddFriendButton (props) {
  
    return (
      <>
      <Fab
        style={props.style}
        >
        <PersonAddIcon/>
      </Fab>
      </>
    );
  }