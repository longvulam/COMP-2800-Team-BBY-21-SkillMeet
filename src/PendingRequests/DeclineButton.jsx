import React from 'react';
import Fab from '@material-ui/core/Fab';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

/**
 * functional component that creates the decline button.
 * @param props props that are passed to the function
 */
export default function AddFriendButton(props) {

  return (
    <>
      <Fab
        style={props.style}
      >
        <CancelOutlinedIcon />
      </Fab>
    </>
  );
}