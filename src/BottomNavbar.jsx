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
import { db, waitForCurrentUser } from './firebase';

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

  function handleChangeURL(event, newValue){
    if (newValue != "friends" && newValue != "chat") {
      history.push(`/${newValue}`);
      setHistoryValue(newValue);
    }
  };

  function handleChange(event, newValue){
    setValue(newValue);
  };

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
      <BottomNavigationAction label="Profile" value="/profile" icon={<AccountIcon />} />
      <BottomNavigationAction 
        label="Friends" 
        value="/friends" 
        icon={
          <Badge badgeContent={newRequestsNo} color="error">
            <LocationOnIcon />
          </Badge>
        } 
      />
      <BottomNavigationAction label="Search" value="/search" icon={<SearchIcon />} />
      <BottomNavigationAction 
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

async function subscribeToUpdates(setNewMessagesNo, setNewRequestsNo){
    const user = await waitForCurrentUser();
    db.collection('users').doc(user.uid)
    .onSnapshot(doc => {
        const updatedUser = doc.data();
        setNewMessagesNo(updatedUser.newMessagesNo);
        setNewRequestsNo(updatedUser.newRequestsNo);
    });
}