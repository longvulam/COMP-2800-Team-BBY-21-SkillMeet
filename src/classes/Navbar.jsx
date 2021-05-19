import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/People';

import { useHistory } from 'react-router-dom';

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

  const [historyValue, setHistoryValue] = React.useState("");
  const history = useHistory();

  function handleChangeURL(event, newValue){
    history.push(`/${newValue}`);
    setHistoryValue(newValue);
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
    <div className = {classes.navbarWrap}>
    <BottomNavigation value={value} onChange={twoCallbacks} className={classes.root}>
      <BottomNavigationAction label="Profile" value="/" icon={<AccountIcon />} />
      <BottomNavigationAction label="Friends" value="/friends" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Search" value="/search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Chat" value="/chat" icon={<ChatIcon />} />
    </BottomNavigation>
    </div>
  );
}