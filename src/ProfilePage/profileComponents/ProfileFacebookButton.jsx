import React from 'react';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import { withRouter } from "react-router";

class FacebookBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    
    return (
      <Fab 
        id="editBtn"
        style={this.props.style}
        onClick={()=>history.push("/socialmedia")}
        aria-label="edit"
        color={'primary'}>
        <FacebookIcon />
      </Fab>
    );
  }
}

export default withRouter(FacebookBtn);