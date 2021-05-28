import React from 'react';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import { withRouter } from "react-router";

/**
 * class component that creates a FacebookIcon button that links to 
 * a page that displays our facebook page.
 */
class FacebookBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;

    return (
      <Fab
        id="facebookBtn"
        style={this.props.style}
        onClick={() => history.push("/facebook")}
        aria-label="edit"
        color={'primary'}>
        <FacebookIcon />
      </Fab>
    );
  }
}

export default withRouter(FacebookBtn);