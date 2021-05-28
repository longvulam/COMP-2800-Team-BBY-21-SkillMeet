/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import UserSearchCard from './searchComponents/UserSearchCard';
import Grid from '@material-ui/core/Grid';
import { db, auth } from '../firebase';
import { skillOptions } from '../dataStores/skills';
import InputAdornment from "@material-ui/core/InputAdornment";
import { SearchSettingsContext } from './searchComponents/SearchSettingsContext';
import debugPackage from 'debug';
const debug = debugPackage('dev');
debug.enabled = true;


/**
 * gets the current user's document ID from firebase auth. 
 * @returns curUserID String the current user's ID
 */
async function getCurrentUIDAsync() {
  const curUserID = await getCurrentUserDataAsync();
  return curUserID;
}

/**
 * gets the current user's data for their document in firebase
 * @returns a promise object that listens for changes, and if there is a user it resolves the user doc id.
 */
function getCurrentUserDataAsync() {
  return new Promise((resolve, reject) =>
      auth.onAuthStateChanged((user) => {
          if (!user) return;
          resolve(user.uid);   
      })
  );
}
getCurrentUIDAsync();

/**
 *  useStyle React hook used to style the elements.
 */
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width:'95%',
    backgroundColor:'white',
    height:'3.5em',
    marginTop:'1em',
    color: theme.palette.primary.dark,
    "&.MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px",
      borderColor: "blue"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px",
      borderColor: "blue"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px",
      borderColor: "blue"
    }
  },
  searchWrap: {
    width: '100vw',
    display: 'flex', 
    justifyContent:'space-around',
    alignItems:'top',
    margin:'auto', 
    position:'fixed',
    top:'0',
    height:'5.4em',
    backgroundColor: theme.palette.primary.dark,
    zIndex:'1000',
  },
  searchBar: {
    width:'calc(100%)',
    color:'white',
  },
  searchIcon: {
    width:'1.5em', 
    height:'auto',
  },
  userContain: {
    width:'98vw',
    margin:'auto',
    marginTop:'5.5em',
    marginBottom:'4.5em',
    overflowY:'scroll',
  },
  cardContain: {
    width:'100%',
  }
}));

/**
 * Functional component built using Material UI components to create a search bar, 
 * which is used to query firestore to find users with the searched skill.  
 */
export default function SearchPage() {
  const classes = useStyles();
  const searchSettings = useContext(SearchSettingsContext);
  const havePrevSettings = !!searchSettings.skills;
  const initialState = havePrevSettings ? searchSettings.skills : [];
  const [searchedSkills, setSearchedSkills] = useState(initialState);

  /**
   * Checks to see if the user is returning to the search page, and 
   * if they are, renders what was previously shown.
   */
  useEffect(() => {
    if(havePrevSettings) {
        getUsersFromSkillSearch(searchedSkills, setSearchedUsers)
    }
  }, []);

  /**
   * Updates the array in state to hold the newly searched skill.  Array is used
   * so the function will work with multiple searched skills in the future.
   * @param {*} event a change in what is selected in the Autocomplete
   * @param {*} currentSelectedSkills the skill currently selecte din the Autocomplete
   */
  function searchedSkillUpdate (event, currentSelectedSkills) {
    console.log('Onchange', currentSelectedSkills);
    const skills = [currentSelectedSkills];
    setSearchedSkills(skills);
    console.log('Skills Searched', skills);
    searchSettings.skills = skills;
  }
  const [searchedUsers, setSearchedUsers] = useState([]);
  
  return (
  <>
 <div className={classes.searchWrap}>
      <Autocomplete
      id="combo-box-demo"
      className={classes.inputRoot}
      options={skillOptions}
      onChange={searchedSkillUpdate}
      disableClearable
      defaultValue={initialState.length === 0 ? "Search By Skills" : initialState[0]}
      forcePopupIcon={false}
      getOptionLabel={option => option}
      renderInput={params => {
        return (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                <Button id="searchBtn" onClick={ ()=> getUsersFromSkillSearch(searchedSkills, setSearchedUsers)}>
                    <SearchIcon color='primary' className={classes.searchIcon}/>
                </Button>
                </InputAdornment>
              )
            }}
          />
        );
      }}
    />
  </div>

  <Grid container direction="column" 
    spacing={1}
    className={classes.userContain}
    >
  {searchedUsers.map((user, index) => {
    console.log('Searched users', user);
    const { name, city, skillName, skillLevel, id, avatar, isFriending } = user;
    return (
      <Grid id={"user_" + index} item xs={12} className={classes.cardContain}>
        <UserSearchCard
          name={name}
          city={city}
          skillName={skillName}
          skillLevel={skillLevel}
          id={id}
          avatar={avatar}
          isFriending={isFriending}
        />
      </Grid>
    );
  })
  }
  </Grid>
  </>  
  );
}

/**
 * gets the users that have skills that match the skills that another user
 * has searched for by querying firestore.
 * @param {*} searchedSkills an array of skills that the user searched for
 * @param {*} setSearchedUsers a function used to set the searchedUsers array in state
 * @returns a userFriend obj with an id, name, city, avatar, skillName, skillLevel, and 
 *          boolean indicating if users are friends/pending friends.
 */
async function getUsersFromSkillSearch(searchedSkills, setSearchedUsers) {
  if(searchedSkills.length <= 0) {return}

  const userSkillDocs = [];
  const userRefDocs = [];

  const snapshots = await db.collectionGroup('Skills')
    .where('skillName', 'in', searchedSkills)
    .get();

  /**
   * gets a ref of the parent document.
   * I found the idea for this code on stackoverflow.com
   * 
   * @author Frank Van Puffelen
   * @see https://stackoverflow.com/questions/56219469/firestore-get-the-parent-document-of-a-subcollection
   */
  snapshots.forEach(userSkillDoc => {
    userSkillDocs.push(userSkillDoc.data());
    userRefDocs.push(userSkillDoc.ref.parent.parent)
  });

  const userInfoDocs = await Promise.all(userRefDocs.map(userRef =>
    userRef.get().then(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    })
  ));
  
  const currentUID = await getCurrentUIDAsync();
  const userFriendsRef = await db.collection('users').doc(currentUID)
    .collection('Friends').get();

  const userFriendsList = userFriendsRef.docs.map(userFriend => userFriend.data());

  const users = userInfoDocs.map((userInfo, i)=> {
      const userFriend = userFriendsList.find(friend => friend.friendID === userInfo.id);
      return {
          id: userInfo.id,
          name: userInfo.displayName,
          city: userInfo.city,
          avatar: userInfo.avatar,
          skillName: userSkillDocs[i].skillName,
          skillLevel: userSkillDocs[i].skillLevel,
          isFriending: userFriend ? true : false
      };
  });

  setSearchedUsers(users);
}
