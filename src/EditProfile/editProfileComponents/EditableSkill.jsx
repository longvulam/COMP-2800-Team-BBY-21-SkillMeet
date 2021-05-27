
import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { skillLevelOptions, skillOptions } from '../../dataStores/skills';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    skillAutocomplete: {
        width: '100%',
        color: 'white',
        marginTop: '0.5em',
        marginLeft: '0.35em',
    },
    skillLevelAutocomplete: {
        width: '100%',
        "&.MuiInput-underline:before": {
            borderBottom: 'none',
        },
    },
    skillLevel: {
        marginTop: '0.5em',
        width: 'calc(100% - 5em)',
        marginLeft: '1em',
    },
    paper: {
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
    },

}));

export default function EditableSkill(props) {
    const { data, index, skillsList, changeState } = props;
    const classes = useStyles();

    async function updateSkillsList(newValue, fieldName) {

        const thisSkill = await getThisSkill();

        if (!thisSkill) return;

        thisSkill[fieldName] = newValue;
        changeState(previousValues => {
            return {
                ...previousValues,
                skills: skillsList
            }
        });
    }

    async function getThisSkill() {
        let thisSkill = skillsList.find(skill => skill.id === data.id);
        thisSkill = thisSkill ? thisSkill : skillsList.find(skill => !skill.id);
        return thisSkill;
    }

    async function deleteSkill(event) {
        const thisSkill = await getThisSkill();

        if (!thisSkill) return;

        thisSkill.isDeleted = true;
        changeState(previousValues => {
            return {
                ...previousValues,
                skills: skillsList
            }
        });
    }

    const skillNames = skillsList.filter(skill => skill.isDeleted && skill.isDeleted === true)
        .map(uSkill => uSkill.skillName);

    const filteredOptions = skillOptions.filter(skillName =>
        !skillNames.includes(skillName) && 
        !skillsList.some(us => us.skillName == skillName) ||
        skillName === data.skillName
    );

    return (
        <Grid item xs={12} style={{
            width: '100%',
        }}>
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
                            id={"skillName_" + index}
                            options={filteredOptions}
                            value={data.skillName}
                            onChange={(event, newValue) => updateSkillsList(newValue, "skillName")}
                            className={classes.skillAutocomplete}
                            forcePopupIcon={false}
                            renderInput={(params) =>
                                <TextField {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        style: { color: 'white', },
                                    }}
                                    className={classes.skillAutocomplete}
                                    variant="standard" />}
                        />
                    </div>
                    <IconButton style={{
                        color: 'white',
                        backgroundColor: 'crimson',
                        width: '1.5em',
                        height: '1.5em',
                    }}
                        onClick={deleteSkill}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <Autocomplete
                    id={"skillLevel_" + index}
                    options={skillLevelOptions}
                    value={data.skillLevel}
                    forcePopupIcon={false}
                    onChange={(event, newValue) => updateSkillsList(newValue, "skillLevel")}
                    className={classes.skillLevel}
                    renderInput={(params) =>
                        <TextField {...params}
                            inputProps={{
                                ...params.inputProps,
                                style: { color: 'white', },
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
                        id={"skillDescription_" + index}
                        value={data.skillDescription}
                        onChange={(event) => updateSkillsList(event.target.value, "skillDescription")}
                        readOnly={false}
                        multiline
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            color: 'white',
                            marginRight: '1em',
                            marginTop: '1em',
                            marginBottom: '1em',
                            marginLeft: '1.5em',
                        }}
                    >
                    </InputBase>
                </div>
            </Paper>
        </Grid >
    );
}