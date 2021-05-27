import React from 'react';
import Fab from '@material-ui/core/Fab';
import TwitterIcon from '@material-ui/icons/Twitter';
import { withRouter } from "react-router";

class TwitterBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    
    return (
      <Fab 
        id="editBtn"
        style={this.props.style}
        onClick={()=>history.push("/twitter")}
        aria-label="edit"
        color={'primary'}>
        <TwitterIcon />
      </Fab>
    );
  }
}

export default withRouter(TwitterBtn);