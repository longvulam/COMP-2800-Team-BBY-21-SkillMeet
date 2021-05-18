import React from 'react';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';


export default function SaveButton (props) {

  function saveButtonClick () {
    console.log('saving');
  }

  return (
    <Fab
      style={props.style}
      onClick={saveButtonClick}
      >
      <SaveIcon/>
    </Fab>
  );
}