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

import firebase, { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

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
    height:'calc(100vh - 9.5em)',
    overflowY:'scroll',
    overFlowX:'hidden',
    margin:'auto',
    marginTop:'1em',
    alignItems:'center',
  },
  cardContain: {
    width:'100%',
  }
}));

export default function SearchPage() {
  const classes = useStyles();
  const [searchedSkills, setSearchedSkills] = useState([]);
  function searchedSkillUpdate (event, currentSelectedSkills) {
    console.log('Onchange', currentSelectedSkills);
    setSearchedSkills([currentSelectedSkills]);
    console.log('Skills Searched', searchedSkills);
  }
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(()=> {
  });

  return (
  <>
  <div className={classes.searchWrap}>
    <Paper elevation={2} className={classes.searchBar}>
      <Autocomplete
        id="tags-standard"
        onChange={searchedSkillUpdate}
        options={skillsList}
        getOptionLabel={(option) => option.title}
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
    className={classes.userContain}>
  {searchedUsers.map(user => {
    const { name, city, skillName, skillLevel, id  } = user;
    return (
      <Grid Item xs={12} className={classes.cardContain}>
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
  console.log('BUTTON CLICKED');
  const searchedSkillList = Array.isArray(searchedSkills) ? searchedSkills.map(skillObj => skillObj.title.toLowerCase()) : searchedSkills;
  const userSkillDocs = [];
  const userInfoDocs = [];
  const users = [];
  db.collectionGroup('Skills')
  .where('skillName', 'in', searchedSkillList)
  .get()
  .then(snapshot => {
    snapshot.forEach(userSkillDoc => {
      userSkillDocs.push(userSkillDoc.data());
      const parentRefDoc = userSkillDoc.ref.parent.parent;
      parentRefDoc.get()
        .then(doc => {
          let userInfoDoc =  {};
          userInfoDoc.name = doc.data().displayName;
          userInfoDoc.city = doc.data().city;
          userInfoDoc.id = doc.id;
          userInfoDocs.push(userInfoDoc);
        })
        .then(() => {
          userInfoDocs.map((userInfo, i)=> {
            let user = {};
            user.name = userInfo.name;
            user.city = userInfo.city;
            user.id = userInfo.id
            user.skillName = userSkillDocs[i].skillName;
            user.skillLevel = userSkillDocs[i].skillLevel;
            users.push(user);
          });
        })
        .then(() => {
          console.log('Users', users);
          setSearchedUsers(users);
        });
    });
  });
}


const skillsList = [
  { title: 'Algorithms' },
  { title: 'Big Data' },
  { title: 'Statistical Analysis' },
  { title: 'Modeling' },
  { title: 'Database Design' },
  { title: 'Compiling Statistics' },
  { title: 'Needs Analysis' },
  { title: 'Documentation' },
  { title: 'Database Management' },
  { title: 'Data Mining' },
  { title: 'Networking' },
  { title: 'Security' },
  { title: 'Servers' },
  { title: 'Testing' },
  { title: 'Python' },
  { title: 'C#' },
  { title: 'Fundamental Analysis' },
  { title: 'Public Speaking' },
  { title: 'Technical Analysis' },
  { title: 'React' },
  { title: 'Java' },
  { title: 'Vue' },
  { title: 'Svelte' },
  { title: 'Ruby' },
  { title: 'Javascript' },
  { title: 'JQuery' },
  { title: 'Firebase' },
  { title: 'MongoDB' },
  { title: 'MySQL' },
  { title: 'Game Development' },
  { title: 'Quality Assurance' },
];
