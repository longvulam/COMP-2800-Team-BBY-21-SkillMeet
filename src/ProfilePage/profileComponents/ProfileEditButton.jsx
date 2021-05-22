import React from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from "react-router";

class EditButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history } = this.props;
    
    return (
      <Fab style={this.props.style}
        onClick={()=>history.push("/editProfile")}
        aria-label="edit"
        color={'default'}>
        <EditIcon />
      </Fab>
    );
  }
}

export default withRouter(EditButton);