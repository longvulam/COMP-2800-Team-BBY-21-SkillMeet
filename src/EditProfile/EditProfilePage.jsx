import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import ProfileBio from '../ProfilePage/profileComponents/ProfileBio';

import SaveButton from './editProfileComponents/SaveButton';
import CancelButton from './editProfileComponents/CancelButton';
import EditableSkill from './editProfileComponents/EditableSkill';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import firebase, { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: '3vw',
    marginTop: '2vw',
    height: '3em',
    width: '3em',
  },
  editWrap: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatarWrap: {
    width: '100vw',
    height: '5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '4.5em',
    width: '4.5em',
  },
  infoWrap: {

  },
}));


export default function Profile() {
  const classes = useStyles();
  const [skills, setSkills] = useState([]);
  getProfileDataAsync(setSkills);
  const data = sampleSkilldata;
  const [editable, setEditable] = useState(false);

  return (
    <div style={{
      width:'100vw',
      height:'calc(100vh - 4em)',
      overflowY:'scroll',
      overflowX:'hidden',
    }}>
       <div className={classes.editWrap}> 
        <CancelButton
          style={{marginRight: '6vw',
          marginTop: '2vw',
          height: '2.5em',
          width: '2.5em',}}
        />
        <SaveButton
          editable={editable} 
          style={{marginRight: '4vw',
          marginTop: '2vw',
          height: '2.5em',
          width: '2.5em',}}
        />
      </div>
    
      <div className={classes.avatarWrap}>
       <Avatar 
        alt="C" 
        src="/static/images/avatar/1.jpg" 
        className={classes.avatar} />
      </div>
  
      <Grid container direction="column" spacing = {1}
        style={{
          margin:'auto',
          marginTop: '1vh',
          alignItems: 'center',
        }}>
        <Grid item xs={12}>
          <InputBase
            defaultValue="Chris"
            readOnly= {!editable}
            inputProps={{ 
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
                border:'none',
              }
           }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputBase
            readOnly= {!editable}
            defaultValue="That Expensive Hotel"
            inputProps={{ 
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
                border:'none',
              }
           }}
          />
        </Grid>
      </Grid>
  
      <Grid container direction="column" spacing = {1}
        style={{
          margin: 'auto',
          marginTop: '2vh',
          width: '95vw',
          alignItems: 'center',
        }}>
        {data.map(accordion => {
          const { skillName, skillLevel, skillDescription } = accordion;
          return (
            <Grid item xs={12} style={{
              width:'100%',
            }}>
              <EditableSkill
                skillName={skillName}
                skillLevel={skillLevel} 
                skillDescription={skillDescription}
                editable={editable}
              />
            </Grid>
          );
        })}
        <Grid item xs={12}
          style={{
            width: '100%',
            display:'flex', 
            alignItems:'center',
            justifyContent:'center',
          }}>
          <IconButton>
            <AddCircleIcon
              style={{
                width:'1.5em',
                height:'1.5em',
              }}
            />
          </IconButton>
          
        </Grid>
        <Grid item xs={12}
          style={{
            width: '100%'
          }}>
          <ProfileBio editable={editable}/>
        </Grid>
      </Grid>
    
    </div>
  );
}

const sampleSkilldata = [
    {
      skillName:'Python',
      skillLevel:'Expert',
      skillDescription:'SkillDescription',
    },
    {
      skillName:'Java',
      skillLevel:'Beginner',
      skillDescription:'SkillDescription',
    },
    {
      skillName:'SQL',
      skillLevel:'Intermediate',
      skillDescription:'SkillDescription',
    },
    {
      skillName:'React',
      skillLevel:'Beginner',
      skillDescription:'SkillDescription',
    },
]

async function getProfileDataAsync(setDataCallback) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            
            // setDataCallback(user);
          console.log(user);
        } else {
            // redirect
        }
      });
  
  const data = {
      
  };

  return (data);
}