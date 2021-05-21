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
  searchWrap: {
    width: '98vw',
    display: 'flex', 
    justifyContent:'space-between',
    alignItems:'top',
    margin:'auto',
    marginTop:'0.5em',
    height:'3.em',
    zIndex:'1000',
  },
  searchBar: {
    width:'calc(100% - 4.1em)',
    color:'white',
  },
  searchIcon: {
    width:'1.4em', 
    height:'auto',
  },
  userContain: {
    width:'98vw',
    margin:'auto',
    marginTop:'1em',
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
    <Paper elevation={2} className={classes.searchBar}>
      <Autocomplete
        id="tags-standard"
        onChange={searchedSkillUpdate}
        options={skillOptions}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Search By Skills"
            placeholder="Skills"
          />
        )}
      />
    </Paper>
    <Paper elevation={2}
    style={{
      height:'100%'
    }}>
      <Button onClick={ ()=> getUsersFromSkillSearch(searchedSkills, setSearchedUsers)}>
        <SearchIcon color='primary' className={classes.searchIcon}/>
      </Button>
    </Paper>
  </div>

  <Grid container direction="column" 
    spacing={1}
    className={classes.userContain}
    >
  {searchedUsers.map(user => {
    console.log('Searchedusers', user);
    const { name, city, skillName, skillLevel, id  } = user;
    return (
      <Grid item xs={12} className={classes.cardContain}>
        <UserSearchCard
          name={name}
          city={city}
          skillName={skillName}
          skillLevel={skillLevel}
          id={id}
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

  const userInfoDocs = await Promise.all(userRefDocs.map(userRef => userRef.get().then(doc => doc.data())));
  userInfoDocs.map((userInfo, i)=> {
    let user = {};
    user.name = userInfo.displayName;
    user.city = userInfo.city;
    user.id = userInfo.id
    user.skillName = userSkillDocs[i].skillName;
    user.skillLevel = userSkillDocs[i].skillLevel;
    users.push(user);
  });
  console.log('Users', users);
  setSearchedUsers(users);
}




