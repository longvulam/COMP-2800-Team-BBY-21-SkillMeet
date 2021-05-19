import React from 'react';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';


export default function SaveButton(props) {
    const { style, onClick } = props;

    return (
        <Fab
            style={style}
            onClick={onClick}
        >
            <SaveIcon />
        </Fab>
    );
}