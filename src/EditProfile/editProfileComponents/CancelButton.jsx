import React from 'react';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';


export default function SaveButton (props) {

  function saveButtonClick () {
    console.log('saving');
  }

  return (
    <Fab
      style={props.style}
      onClick={saveButtonClick}
      color={''}
      >
      <CancelIcon/>
    </Fab>
  );
}