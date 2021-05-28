import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import Pending from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';
import { db, waitForCurrentUser } from '../../firebase';
import { Badge } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: 1,
    width: '100vw',
    height: '4em',
  },
  navbarWrap: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
  }
});

/**
 * functional component that creates a navbar used to navigate between friend 
 * requests and a user's friend list.
 * 
 */
export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const history = useHistory();
  const [historyValue, setHistoryValue] = React.useState("");
  const [newRequestsNo, setNewRequestsNo] = React.useState(0);

  React.useEffect(async () => subscribeToUpdates(setNewRequestsNo), []);

  function handleChange(event, newValue) {
    setValue(newValue);
  };

  /**
   * calls two other callback functions, sets the value for the navbar, and changes the routes.
   * @param event on change, one of the buttons is pressed.
   * @param newValue value that the bottom navigation bar displays
   */
  function twoCallbacks(event, newValue) {
    history.push(`${newValue}`);
    setHistoryValue(newValue);
    setValue(newValue);
  }

  return (
    <Paper
      elevation={2}
      className={classes.navbarWrap}>
      <BottomNavigation value={value} onChange={twoCallbacks} className={classes.root}>
        <BottomNavigationAction label="Friends" value="/friends"
          icon={
            <Badge badgeContent={newRequestsNo} color="error">
              <GroupIcon />
            </Badge>}
        />
        <BottomNavigationAction label="Requests" value="/friendRequests" icon={<Pending />} />
      </BottomNavigation>
    </Paper>
  );
}

/**
 * listens for changes to keep newRequestsNo, the number of new requests up to date.
 * @param setNewRequestsNo a function that sets the new number of requests. 
 */
async function subscribeToUpdates(setNewRequestsNo) {
  const user = await waitForCurrentUser();
  db.collection('users').doc(user.uid)
    .onSnapshot(doc => setNewRequestsNo(doc.data().newRequestsNo));
}
