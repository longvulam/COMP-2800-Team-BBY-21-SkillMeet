import React from 'react';
import Fab from '@material-ui/core/Fab';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

/**
 * functional component that creates the accept button.
 * @param props props that are passed to the function
 */
export default function AddFriendButton(props) {

  return (
    <>
      <Fab
        style={props.style}
      >
        <CheckCircleOutlinedIcon />
      </Fab>
    </>
  );
}