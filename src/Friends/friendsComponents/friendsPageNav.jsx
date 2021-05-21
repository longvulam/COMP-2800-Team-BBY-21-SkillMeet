import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FriendIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import Pending from '@material-ui/icons/PersonAdd';

import { useHistory } from 'react-router-dom';

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

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const history = useHistory();
  const [historyValue, setHistoryValue] = React.useState("");

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
      <BottomNavigationAction label="Friends" value="/friends" icon={<FriendIcon />} />
      <BottomNavigationAction disabled label="Groups" value="/groups" icon={<GroupIcon style={{color:'lightgrey'}}/>} />
      <BottomNavigationAction label="Requests" value="/friendRequests" icon={<Pending/>} />
    </BottomNavigation>
    </div>
  );
}