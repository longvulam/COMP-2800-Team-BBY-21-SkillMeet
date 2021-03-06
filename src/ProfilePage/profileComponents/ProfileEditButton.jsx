import React from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from "react-router";

/**
 * class component that creates an EditIcon button that links to 
 * a page that allows editting of the profile.
 */
class EditButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history } = this.props;

    return (
      <Fab
        id="editBtn"
        style={this.props.style}
        onClick={() => history.push("/editProfile")}
        aria-label="edit"
        color={'primary'}>
        <EditIcon />
      </Fab>
    );
  }
}

export default withRouter(EditButton);