
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {skillLevelOptions, skillOptions} from '../../dataStores/skills';

export default function EditableSkill(props) {
    const { data, skillsList, changeState } = props;

    async function updateSkillsList(newValue, fieldName) {
        const thisSkill = skillsList.find(skill => skill.skillName === data.skillName);
        thisSkill[fieldName]= newValue;
        changeState(previousValues => {
            return {
                ...previousValues,
                skills: skillsList
            }
        });
    }

    return (
        <Paper style={{
            width: '100%',
        }}>
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
                        style={{ width: '55%', }}
                        renderInput={(params) =>
                            <TextField {...params}
                                style={{
                                    border: 'none',
                                }}
                                variant="standard" />}
                    />
                    <Autocomplete
                        options={skillLevelOptions}
                        value={data.skillLevel}
                        onChange={(event, newValue) => updateSkillsList(newValue, "skillLevel")}
                        style={{ width: '35%', }}
                        renderInput={(params) =>
                            <TextField {...params}
                                style={{
                                    border: 'none',
                                }}
                                variant="standard" />}
                    />
                </div>
                <IconButton>
                    <DeleteIcon
                    />
                </IconButton>
            </div>
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
                        width: '95%',
                        textAlign: 'center',
                    }}
                >
                </InputBase>
            </div>
        </Paper>

    );
}