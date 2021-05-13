import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/People';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className = {classes.navbarWrap}>
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Profile" value="favorites" icon={<AccountIcon />} />
      <BottomNavigationAction label="Friends" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Search" value="recents" icon={<SearchIcon />} />
      <BottomNavigationAction label="Chat" value="folder" icon={<ChatIcon />} />
    </BottomNavigation>
    </div>
  );
}

// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div id = "navbarContain">

//       </div>
//     );
//   }
// }
