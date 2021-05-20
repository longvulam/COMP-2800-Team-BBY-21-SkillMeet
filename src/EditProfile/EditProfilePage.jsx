import React, { useEffect, useState } from 'react';
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

import { auth, db, getCurrentUserDataAsync } from '../firebase';

async function submitChanges(profile) {
    const isValid = validateProfile(profile);
    if (!isValid) {
        console.log("Cannot save skills with empty values!");
        return;
    }

    const skills = profile.skills;
    delete profile.skills;

    // Get a new write batch
    const batch = db.batch();

    const userRef = db.collection('users').doc(auth.currentUser.uid);
    batch.update(userRef, profile);

    const nonDeletedSkills = skills.filter(skill => !skill.isDeleted);
    nonDeletedSkills.filter(skill => !skill.isNew).forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.update(skillRef, skill);
    });

    nonDeletedSkills.filter(skill => skill.isNew).forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.set(skillRef, skill);
    });

    skills.filter(skill => skill.isDeleted).forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.delete(skillRef);
    });

    // Commit the batch
    batch.commit().then(() => {
        console.log("Profile Saved!")
    });
}

function validateProfile(profile) {
    const emptySkill = profile.skills.find(skill => !skill.skillName || !skill.skillLevel);

    if (emptySkill) {
        return false;
    }

    return true;
}

async function addSkill(changeState) {
    changeState(previousState => {
        previousState.skills.push({
            id: "skill" + (previousState.skills.length + 1),
            skillName: "",
            skillLevel: "",
            skillDescription: "",
            isNew: true
        });
        return {
            ...previousState
        }
    });
}

export default function Profile() {
    const classes = useStyles();
    const [userProfile, setUserProfile] = useState({
        displayName: "",
        location: "",
        bio: "",
        skills: [],
    });
    useEffect(() => getCurrentUserDataAsync().then(setUserProfile), []);

    async function changeState(newValue, fieldName) {
        setUserProfile(previousValues => {
            return {
                ...previousValues,
                [fieldName]: newValue
            }
        });
    }

    return (
        <div style={{
            width: '100vw',
            height: 'calc(100vh - 4em)',
            overflowY: 'scroll',
            overflowX: 'hidden',
        }}>
            <div className={classes.editWrap}>
                <CancelButton
                    style={{
                        marginRight: '6vw',
                        marginTop: '2vw',
                        height: '2.5em',
                        width: '2.5em',
                    }}
                />
                <SaveButton
                    onClick={(event) => submitChanges(Object.assign({}, userProfile))}
                    editable={true}
                    style={{
                        marginRight: '4vw',
                        marginTop: '2vw',
                        height: '2.5em',
                        width: '2.5em',
                    }}
                />
            </div>

            <div className={classes.avatarWrap}>
                <Avatar
                    alt="C"
                    src="/static/images/avatar/1.jpg"
                    className={classes.avatar} />
            </div>

            <Grid container direction="column" spacing={1}
                style={{
                    margin: 'auto',
                    marginTop: '1vh',
                    alignItems: 'center',
                }}>
                <Grid item xs={12}>
                    <InputBase
                        value={userProfile.displayName}
                        onChange={(event) => changeState(event.target.value, "displayName")}
                        readOnly={false}
                        inputProps={{
                            'aria-label': 'naked',
                            style: {
                                textAlign: 'center',
                                border: 'none',
                            }
                        }} />
                </Grid>
                <Grid item xs={12}>
                    <InputBase
                        readOnly={false}
                        value={userProfile.city}
                        onChange={(event) => changeState(event.target.value, "city")}
                        inputProps={{
                            'aria-label': 'naked',
                            style: {
                                textAlign: 'center',
                                border: 'none',
                            }
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container direction="column" spacing={1}
                style={{
                    margin: 'auto',
                    marginTop: '2vh',
                    width: '95vw',
                    alignItems: 'center',
                }}>
                <SkillsList
                    userSkills={userProfile.skills.filter(skill => !skill.isDeleted)}
                    setUserProfile={setUserProfile}
                />
                <Grid item xs={12}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <IconButton
                        onClick={addSkill.bind(this, setUserProfile)}>
                        <AddCircleIcon
                            style={{
                                width: '1.5em',
                                height: '1.5em',
                            }}
                        />
                    </IconButton>

                </Grid>
                <Grid item xs={12}
                    style={{
                        width: '100%'
                    }}>
                    <ProfileBio
                        bio={userProfile.bio}
                        changeState={changeState}
                        editable={true} />
                </Grid>
            </Grid>

        </div>
    );
}

function SkillsList(props) {
    const { userSkills, setUserProfile } = props;
    return userSkills.map((skill, index) =>
        <Grid key={index} item xs={12} style={{
            width: '100%',
        }}>
            <EditableSkill
                data={skill}
                skillsList={userSkills}
                changeState={setUserProfile}
            />
        </Grid>
    );
}

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