import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import UserSearchCard from './searchComponents/UserSearchCard';
import Grid from '@material-ui/core/Grid';

import firebase, { db, auth } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

import { skillOptions } from '../dataStores/skills';
import createPalette from '@material-ui/core/styles/createPalette';
import InputAdornment from "@material-ui/core/InputAdornment";

// import Theme from '../theme/Theme'
console.log('SkillOptions', skillOptions);



async function getCurrentUIDAsync() {
  const curUserID = await getCurrentUserDataAsync();
}

function getCurrentUserDataAsync() {
  return new Promise((resolve, reject) =>
      auth.onAuthStateChanged((user) => {
          if (!user) return;
          resolve(user.uid);   
      })
  );
}
getCurrentUIDAsync();

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width:'95%',
    backgroundColor:'white',
    height:'3.5em',
    marginTop:'1em',
    color: theme.palette.primary.dark,
    "& .MuiOutlinedInput-notchedOutline": {
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

async function loadSkillsAsync(setSkillListFromDB, mounted) {
  const skillOptions = [];
  db.collection("userSkills").get()
  .then(querySs => {
    querySs.forEach(doc => skillOptions.push(doc.data().name))
    if (mounted) {setSkillListFromDB(skillOptions);}
    return () => mounted = false
  });
}

export default function SearchPage() {
  const classes = useStyles();
  const [searchedSkills, setSearchedSkills] = useState([]);
  function searchedSkillUpdate (event, currentSelectedSkills) {
    console.log('Onchange', currentSelectedSkills);
    setSearchedSkills([currentSelectedSkills]);
    console.log('Skills Searched', searchedSkills);
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
      defaultValue="Search By Skills"
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
                <Button onClick={ ()=> getUsersFromSkillSearch(searchedSkills, setSearchedUsers)}>
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
  {/* <div className={classes.searchWrap}>
    <Autocomplete
      id="tags-standard"
      onChange={searchedSkillUpdate}
      className={classes.searchBar}
      options={skillOptions}
      getOptionLabel={(option) => option}
      disableClearable
      forcePopupIcon={false}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Search By Skills"
          placeholder="Skills"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={ ()=> getUsersFromSkillSearch(searchedSkills, setSearchedUsers)}>
                  <SearchIcon color='primary' className={classes.searchIcon}/>
                </Button>
              </InputAdornment>
            )
          }}
        />
      )}
      />
  </div> */}



  <Grid container direction="column" 
    spacing={1}
    className={classes.userContain}
    >
  {searchedUsers.map(user => {
    console.log('Searchedusers', user);
    const { name, city, skillName, skillLevel, id, avatar } = user;
    return (
      <Grid item xs={12} className={classes.cardContain}>
        <UserSearchCard
          name={name}
          city={city}
          skillName={skillName}
          skillLevel={skillLevel}
          id={id}
          avatar={avatar}
        />
      </Grid>
    );
  })
  }
  </Grid>
  </>  
  );
}

async function getUsersFromSkillSearch(searchedSkills, setSearchedUsers) {
  if(searchedSkills.length <= 0) {return}

  const userSkillDocs = [];
  const userRefDocs = [];
  const users = [];
  
  const snapshots = await db.collectionGroup('Skills')
  .where('skillName', 'in', searchedSkills)
  .get();
  snapshots.forEach(userSkillDoc => {
    userSkillDocs.push(userSkillDoc.data());
    userRefDocs.push(userSkillDoc.ref.parent.parent)
  });

  const userInfoDocs = await Promise.all(userRefDocs.map(userRef =>
    userRef.get().then(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    }))
  );

  userInfoDocs.map((userInfo, i)=> {
    let user = {};
    user.name = userInfo.displayName;
    user.city = userInfo.city;
    user.id = userInfo.id;
    user.avatar = userInfo.avatar;
    user.skillName = userSkillDocs[i].skillName;
    user.skillLevel = userSkillDocs[i].skillLevel;
    users.push(user);
  });
  console.log('Users', users);
  setSearchedUsers(users);
}




