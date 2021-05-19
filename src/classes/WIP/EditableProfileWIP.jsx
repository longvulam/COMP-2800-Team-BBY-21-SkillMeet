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
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';


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

const AutocompleteStyles = makeStyles(theme => ({
  endAdornment: {
      display: 'none'
  }
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
    <Fab style={ this.props.styles }
      onClick={ editButtonClick }
      aria-label="edit"
      color={editable ? 'primary' : 'default'}>
      <EditIcon />
    </Fab>
    );
  }
}

class SkillItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const editable  = this.props.editable;
    const skillOptions = this.props.top100Films;
    const autocompleteStyle = this.props.autocompleteStyle;
    const defaultSkill = this.props.defaultSkill;
    return (
    <>
      <div style={{
        display:'flex',
      }}>
      <Autocomplete
        id="Skill"
        disabled={!editable}
        options={skillOptions}
        defaultValue={defaultSkill}
        getOptionLabel={(option) => option.skillName}
        style={ autocompleteStyle }
        renderInput={(params) => <TextField {...params} label="Skill" variant="standard" />}
      />
      <Autocomplete
        id="SkillLevel"
        disabled={!editable}
        options={skillOptions}
        defaultValue={defaultSkill}
        getOptionLabel={(option) => option.skillName}
        style={ autocompleteStyle }
        renderInput={(params) => <TextField {...params} label="Experience"  variant="standard" />}
      />
      </div>
     
    </>
    );
  }
}

function skillList(props) {
  const skills = props.skills;
  const listItems = skills.map((skill, index) => {

  });
}

function getSkillData(props) {
  const data = [
    {
      id:'panel2',
    },
    {
      id:'panel3',
    },
    {
      id:'panel4',
    },
    {
      id:'panel5',
    },
    {
      id:'panel6',
    },
    {
      id:'panel6',
    }
  ]
  return (data);
}

function getSelectableSkills (props) {
  console.log('I was called');
  const selectableSkills = [
    { skillName: 'JavaScript' },
    { skillName: 'Python' },
    { skillName: 'SQL' },
  ]
  return selectableSkills;
}

export default function Profile() {
  const classes = useStyles();
  const data = getSkillData();
  const [editable, setEditable] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const expandSkills = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const filmData = skillsList;

  const updateSkill = (e) => {
    if(e.target.readOnly){
      console.log( 'Value', e.target.value);
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
        <Grid Item xs={12}>
          <SkillItem
            editable={false}
            top100Films={filmData}
            setEditable={setEditable}
            autocompleteStyle = {{
              width: '40vw',
            }}
          />
        </Grid>
      {/* {data.map(accordion => {
        const { id } = accordion;
        return (
        <Grid item>
          <Accordion expanded={expanded === id} onChange={expandSkills(id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            key={id}
          >
            <InputBase
              readOnly= {!editable}
              defaultValue="Skill"
              onChange={updateSkill}
              inputProps={{ 
                'aria-label': 'naked',
                style: {
                  textAlign: 'center',
                }
            }}
            />
          <InputBase
            readOnly= {!editable}
            defaultValue="Level"
            inputProps={{ 
              'aria-label': 'naked',
              style: {
                textAlign: 'center',
              }
          }}
          />
          <IconButton>

          </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        </Grid>
        );
      })} */}
    </Grid>
  </div>
  );
}

const skillsList = [
  {skillName: 'Java'},
  {skillName: 'Python'},
  {skillName: 'SQL'},
  {skillName: 'Roblox'},
]