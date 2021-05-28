/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/People';
import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { db, waitForCurrentUser } from '../firebase';

const useStyles = makeStyles({
  root: {
    marginTop: 1,
    width: '100vw',
    height: '4em',
  },
  navbarWrap: {
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
  }
});

/**
 * Functional component built using Material UI components 
 * to create a Navigation bar on the bottom.
 */
export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const history = useHistory();
  const [historyValue, setHistoryValue] = React.useState("");
  const [newMessagesNo, setNewMessagesNo] = React.useState(0);
  const [newRequestsNo, setNewRequestsNo] = React.useState(0);

  useEffect(async ()=>{
    subscribeToUpdates(setNewMessagesNo, setNewRequestsNo);
  }, []);

  /** Value handler function */
  function twoCallbacks(event, newValue) {
    history.push(`${newValue}`);
    setHistoryValue(newValue);
    setValue(newValue);
  }

  return (
    <Paper 
    elevation={4}
    className = {classes.navbarWrap}>
    <BottomNavigation value={value} onChange={twoCallbacks} className={classes.root}>
      <BottomNavigationAction 
        id="profileBtn"
        label="Profile"
        value="/profile"
        icon={<AccountIcon />} />
      <BottomNavigationAction
        id="friendsBottomBtn"
        label="Friends"
        value="/friends"
        icon={
          <Badge badgeContent={newRequestsNo} color="error">
            <LocationOnIcon />
          </Badge>
        } 
      />
      <BottomNavigationAction
        id="searchBottomBtn"
        label="Search"
        value="/search"
        icon={<SearchIcon />} />
      <BottomNavigationAction
        id="chatListBtn"
        label="Chat"
        value="/chatrooms"
        icon={
        <Badge badgeContent={newMessagesNo} color="error">
          <ChatIcon />
        </Badge>
        }
      />
    </BottomNavigation>
    </Paper>
  );
}

/** Subscribes to message and request notification updates. */
async function subscribeToUpdates(setNewMessagesNo, setNewRequestsNo){
    const user = await waitForCurrentUser();
    db.collection('users').doc(user.uid)
    .onSnapshot(doc => {
        const updatedUser = doc.data();
        setNewMessagesNo(updatedUser.newMessagesNo);
        setNewRequestsNo(updatedUser.newRequestsNo);
    });
}