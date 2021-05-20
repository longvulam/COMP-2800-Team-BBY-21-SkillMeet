import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';

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

function SkillAccordion(props) {
  const { skillName, skillLevel, skillDescription }= props;
  
  const [expanded, setExpanded] = React.useState(false);
  
  function expandSkills() {
    setExpanded(!expanded);
  }
  
  return (
    <Accordion
      expanded={expanded}
      onChange={expandSkills}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        key={skillName}
      >
        <InputBase
          defaultValue={skillName}
          inputProps={{
            'aria-label': 'naked',
            style: {
              textAlign: 'center',
            }
          }}
        />
        <InputBase
          defaultValue={skillLevel}
          inputProps={{
            'aria-label': 'naked',
            style: {
              textAlign: 'center',
            }
          }}
        />
        
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {skillDescription}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}



export default function Profile() {
  const classes = useStyles();
  const data = getSkillData();
  const [editable, setEditable] = React.useState(false);

  const updateSkill = (e) => {
    if (e.target.readOnly) {
      console.log('Value', e.target.value);
    }
  }

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

function getSkillData(props) {
  const skillData = [
    {
    skillDescription: 'SkillDescription',
    skillLevel: 'Expert',
    skillName: 'Python',
    },
  ]
  return (skillData);
}