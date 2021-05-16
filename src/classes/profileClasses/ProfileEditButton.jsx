import React from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    props.setEditable(false);
  }
  render() {
    const { editable, setEditable } = this.props;
    const editButtonClick = () => setEditable(!editable);
    return (
      <Fab style={this.props.style}
        onClick={editButtonClick}
        aria-label="edit"
        color={editable ? 'primary' : 'default'}>
        <EditIcon />
      </Fab>
    );
  }
}