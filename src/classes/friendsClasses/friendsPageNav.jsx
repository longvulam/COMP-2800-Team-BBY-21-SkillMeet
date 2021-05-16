import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FriendIcon from '@material-ui/icons/PersonOutline';
import GroupIcon from '@material-ui/icons/Group';
import Pending from '@material-ui/icons/PersonAdd';

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

  function handleChange(event, newValue){
    setValue(newValue);
  };
  return (
    <div className = {classes.navbarWrap}>
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Friends" value="/profile" icon={<FriendIcon />} />
      <BottomNavigationAction disabled label="Groups" value="/friends" icon={<GroupIcon/>} />
      <BottomNavigationAction disabled label="Pending" value="/chat" icon={<Pending/>} />
    </BottomNavigation>
    </div>
  );
}