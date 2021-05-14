import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import SkillAccordion from './SkillAccordion';
import ProfileBio from './profileBio';

import firebase from '../firebase';

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

class EditButton extends React.Component {
  constructor(props) {
    super(props);
    props.setEditable(false);
  }
  render() {
    const { editable, setEditable } = this.props;
    const editButtonClick = () => setEditable(!editable);
    return (
      <Fab style={this.props.styles}
        onClick={editButtonClick}
        aria-label="edit"
        color={editable ? 'primary' : 'default'}>
        <EditIcon />
      </Fab>
    );
  }
}

export default function Profile() {
  const classes = useStyles();
  const [skills, setSkills] = useState([]);
  getProfileDataAsync(setSkills);
  const data = [];
  const [editable, setEditable] = useState(false);

  return (
    <div style={{
      width:'100vw',
      height:'calc(100vh - 4em)',
      overflowY:'scroll',
      overflowX:'hidden',
    }}>
      <div className={classes.editWrap}>
        <EditButton 
          editable={editable} 
          setEditable={setEditable}
          styles={{marginRight: '4vw',
          marginTop: '2vw',
          height: '2.5em',
          width: '2.5em',}}
        />
      </div>
  
      <div className={classes.avatarWrap}>
       <Avatar 
        alt="Profile Picture" 
        src="/static/images/avatar/1.jpg" 
        className={classes.avatar} />
      </div>
  
      <Grid container direction="column" spacing = {1}
        style={{
          margin:'auto',
          marginTop: '2vh',
        }}>
        <Grid item xs={12}>
          <InputBase
            defaultValue="Name"
            readOnly= {!editable}
            inputProps={{ 
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
              }
           }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputBase
            readOnly= {!editable}
            defaultValue="Location"
            inputProps={{ 
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
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
            <Grid item xs={12}>
              <SkillAccordion 
                skillName={skillName}
                skillLevel={skillLevel} 
                skillDescription={skillDescription}
              />
            </Grid>
          );
        })}
        <Grid item xs={12}
          style={{
            width: '100%'
          }}>
          <ProfileBio/>
        </Grid>
      </Grid>
    
    </div>
  );
}

const skillsList = [
  { skillName: 'Java' },
  { skillName: 'Python' },
  { skillName: 'SQL' },
  { skillName: 'Roblox' },
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