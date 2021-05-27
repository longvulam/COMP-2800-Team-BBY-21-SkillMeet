import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import ProfileBio from '../ProfilePage/profileComponents/ProfileBio';

import SaveButton from './editProfileComponents/SaveButton';
import CancelButton from './editProfileComponents/CancelButton';
import EditableSkill from './editProfileComponents/EditableSkill';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { auth, db, firestore, getCurrentUserDataAsync, storage } from '../firebase';
import LoadingSpinner from '../common/LoadingSpinner';
import { useHistory } from 'react-router';

import TextField from '@material-ui/core/TextField';
import { Snackbar } from '@material-ui/core';
import { EditProfileAlert } from './editProfileComponents/EditProfileAlert';

function validateProfile(profile) {
    const emptySkill = profile.skills.find(skill => !skill.skillName || !skill.skillLevel);

    if (!!emptySkill) return false;
    if (!profile.displayName) return false;
    if (!profile.city) return false;

    return true;
}

async function submitChanges(profile, afterSave, onInvalid) {
    const isValid = validateProfile(profile);
    if (!isValid) {
        console.log("Cannot save skills with empty values!");
        onInvalid();
        return;
    }
    const cloneProfile = Object.assign({}, profile);
    const skills = cloneProfile.skills;
    delete cloneProfile.skills;

    // Get a new write batch
    const batch = db.batch();

    const userRef = db.collection('users').doc(auth.currentUser.uid);
    batch.update(userRef, cloneProfile);

    const nonDeletedSkills = skills.filter(skill => !skill.isDeleted);
    nonDeletedSkills.filter(skill => !skill.isNew).forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.update(skillRef, skill);
    });

    nonDeletedSkills.filter(skill => skill.isNew).forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.set(skillRef, skill);
    });

    const deletedSkills = skills.filter(skill => skill.id && skill.isDeleted);

    deletedSkills.forEach(skill => {
        const skillRef = userRef.collection("Skills").doc(skill.id);
        batch.delete(skillRef);
    });

    // Commit the batch
    batch.commit().then(afterSave);
}

async function addSkill(changeState) {
    changeState(previousState => {
        previousState.skills.push({
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

export default function EditProfile() {
    const classes = useStyles();
    const history = useHistory();
    const [errorOpen, setErrorOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [userProfile, setUserProfile] = useState({
        displayName: "",
        city: "",
        bio: "",
        skills: [],
        avatar: "",
    });

    useEffect(() => getCurrentUserDataAsync()
        .then(setUserProfile)
        .then(() => setIsLoadingData(false)), []);

    async function changeState(newValue, fieldName) {
        setUserProfile(previousValues => {
            return {
                ...previousValues,
                [fieldName]: newValue
            }
        });
        setIsLoadingData(false);
    }

    function saveFinished() {
        console.log("Profile Saved!");
        history.push({
            pathname: '/profile',
            state: { saveSuccess: true }
        });
    }

    function onInvalid() {
        setErrorOpen(true);
    }

    const handleImageChange = async (event) => {
        const avatarImage = event.target.files[0];
        const storageRef = storage.ref();
        const avatarImageRef = storageRef.child(avatarImage.name);
        await avatarImageRef.put(avatarImage);
        const avatarImageUrl = await avatarImageRef.getDownloadURL();
        changeState(avatarImageUrl, "avatar");
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('uploadImage');
        fileInput.click();
    }

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        setErrorOpen(false);
    };

    return (
        isLoadingData ? <LoadingSpinner /> :
            <div style={{
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingBottom: '10em',
            }}>
                <div className={classes.editWrap} id="btnWrapper">
                    <CancelButton
                        style={{
                            marginRight: '6vw',
                            marginTop: '2vw',
                            height: '2.5em',
                            width: '2.5em',
                        }}
                    />
                    <SaveButton
                        onClick={(event) => submitChanges(userProfile, saveFinished, onInvalid)}
                        editable={true}
                    />
                </div>

                <div className={classes.avatarWrap}>
                    <Avatar
                        alt="Profile Pic"
                        src={userProfile.avatar}
                        className={classes.avatar} />
                </div>
                <div className={classes.editAvatarWrap}>
                    <input type="file" id="uploadImage" onChange={handleImageChange} hidden="hidden" />
                    <Fab onClick={handleEditPicture} className={classes.editAvatarbtn}>
                        <EditIcon />
                    </Fab>
                </div>

                <Grid container direction="column" spacing={1}
                    style={{
                        margin: 'auto',
                        marginTop: '1vh',
                        alignItems: 'center',
                    }}>
                    <Grid item xs={12}>
                        <TextField
                            id="userNameField"
                            label="UserName"
                            variant="filled"
                            readOnly={false}
                            value={userProfile.displayName}
                            onChange={(event) => changeState(event.target.value, "displayName")}
                            inputProps={{
                                'aria-label': 'naked',
                                style: {
                                    textAlign: 'center',
                                    border: 'none',
                                    backgroundColor: '#e3f6f5'
                                }
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="cityField"
                            label="Location"
                            variant="filled"
                            readOnly={false}
                            value={userProfile.city}
                            onChange={(event) => changeState(event.target.value, "city")}
                            inputProps={{
                                'aria-label': 'naked',
                                style: {
                                    textAlign: 'center',
                                    border: 'none',
                                    backgroundColor: '#e3f6f5'
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
                        userSkills={userProfile.skills}
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
                            className={classes.addMoreSkillButton}
                            onClick={addSkill.bind(this, setUserProfile)}>
                            <AddIcon
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
                <Snackbar
                    id="errorSnackbar"
                    open={errorOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}>
                    <EditProfileAlert onClose={handleClose} severity="error">
                        Values must not be empty
                    </EditProfileAlert>
                </Snackbar>
            </div>
    );
}

function SkillsList(props) {
    const { userSkills, setUserProfile } = props;
    return userSkills.filter(skill => !skill.isDeleted)
        .map((skill, index) =>
            <EditableSkill
                key={index}
                data={skill}
                skillsList={userSkills}
                changeState={setUserProfile}
            />
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
    editAvatarWrap: {
        width: '100vw',
        height: '4em',
        marginLeft: '3em',
        marginTop: '-1em',
        marginBottom: '-1em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bacgroundColor: 'black',
    },
    avatar: {
        height: '6.5em',
        width: '6.5em',
    },
    addMoreSkillButton: {
        backgroundColor: theme.palette.primary.dark,
        width: '1.5em',
        height: '1.5em',
        color: 'white',
    },
    editAvatarbtn: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        height: '3em',
        width: '3em',
    }
}));