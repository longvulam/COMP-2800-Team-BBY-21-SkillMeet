
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { skillLevelOptions, skillOptions } from '../../dataStores/skills';


const useStyles = makeStyles((theme) => ({
  skillAutocomplete: {
    width:'100%',
    color:'white',
    marginTop:'0.5em',
    marginLeft:'0.35em',
  },
  skillLevelAutocomplete: {
    width:'100%',
    "&.MuiInput-underline:before": {
      borderBottom:'none',
    },
  },
  skillLevel: {
    marginTop:'0.5em',
    width:'calc(100% - 5em)',
    marginLeft:'1em',
  },
  paper: {
    backgroundColor:theme.palette.primary.dark,
    width:'100%',
  },
  
}));

export default function EditableSkill(props) {
    const { data, skillsList, changeState } = props;
    const classes = useStyles();

    async function updateSkillsList(newValue, fieldName) {
        const thisSkill = skillsList.find(skill => skill.skillName === data.skillName);
        thisSkill[fieldName] = newValue;
        changeState(previousValues => {
            return {
                ...previousValues,
                skills: skillsList
            }
        });
    }

    async function deleteSkill(event) {
        const thisSkill = skillsList.find(skill => skill.skillName === data.skillName);
        thisSkill.isDeleted = true;
        changeState(previousValues => {
            return {
                ...previousValues,
                skills: skillsList
            }
        });
    }

    return (
        <Paper 
        elevation={3}
        className={classes.paper}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: 'calc(100% - 5em)',
                }}>
                    <Autocomplete
                        options={skillOptions}
                        value={data.skillName}
                        onChange={(event, newValue) => updateSkillsList(newValue, "skillName")}
                        className={classes.skillAutocomplete}
                        forcePopupIcon={false}
                        renderInput={(params) =>
                            <TextField {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  style: {color:'white',},
                                }}
                                className={classes.skillAutocomplete}
                                variant="standard" />}
                    />
                </div>
                <IconButton style={{
                  color:'white',
                  backgroundColor:'crimson',
                  width:'1.5em',
                  height:'1.5em',
                }}
                  onClick={deleteSkill}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Autocomplete
              options={skillLevelOptions}
              value={data.skillLevel}
              forcePopupIcon={false}
              onChange={(event, newValue) => updateSkillsList(newValue, "skillLevel")}
              className={classes.skillLevel}
              renderInput={(params) =>
                <TextField {...params}
                inputProps={{
                  ...params.inputProps,
                  style: {color:'white',},
                }}
                className={classes.skillAutocomplete}
                variant="standard" />}
                />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}>
                <InputBase
                    value={data.skillDescription}
                    onChange={(event) => updateSkillsList(event.target.value, "skillDescription")}
                    readOnly={false}
                    multiline
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        color:'white',
                        marginRight:'1em',
                        marginTop:'1em',
                        marginBottom:'1em',
                        marginLeft:'1.5em',
                    }}
                >
                </InputBase>
            </div>
        </Paper>

    );
}