import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import SkillAccordion from './profileComponents/SkillAccordion';
import ProfileBio from './profileComponents/ProfileBio';
import EditButton from './profileComponents/ProfileEditButton';
import LogOutButton from  './profileComponents/LogOutButton';

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
    const [userProfile, setUserProfile] = useState({
        city: "",
        displayName: "",
        bio: "",
        skills: []
    });
    
    const [userSkills, setUserSkills] = useState([]);

    useEffect(()=> {
      getProfileDataAsync(setUserProfile);
      getUserSkillDataAsync(setUserSkills);
    });
    
    const data = sampleSkilldata;
    const [editable, setEditable] = useState(false);

    return (
        <div style={{
            width: '100vw',
            height: 'calc(100vh - 4em)',
            overflowY: 'scroll',
            overflowX: 'hidden',
        }}>
            <div className={classes.editWrap}>
                <LogOutButton
                    style={{
                        marginRight: '6vw',
                        marginTop: '2vw',
                        height: '2.5em',
                        width: '2.5em',
                    }}
                />
                <EditButton
                    editable={editable}
                    setEditable={setEditable}
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
                    alt="Profile Picture"
                    src="/static/images/avatar/1.jpg"
                    className={classes.avatar} />
            </div>

            <Grid container direction="column" spacing={1}
                style={{
                    margin: 'auto',
                    marginTop: '2vh',
                    alignItems: 'center',
                }}>
                <Grid item xs={12}>
                    <InputBase
                        defaultValue="Loading name..."
                        value={userProfile.displayName}
                        readOnly={!editable}
                        inputProps={{
                            'aria-label': 'naked',
                            style: {
                                textAlign: 'center',
                                border: 'none',
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBase
                        readOnly={!editable}
                        defaultValue="Loading location..."
                        value={userProfile.city}
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
                {userSkills.map(accordion => {
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
                    <ProfileBio 
                        bio = {userProfile.bio}
                    />
                </Grid>
            </Grid>

        </div>
    );
}

const sampleSkilldata = [
    {
        skillName: 'Python',
        skillLevel: 'Expert',
        skillDescription: 'SkillDescription',
    },
    {
        skillName: 'Java',
        skillLevel: 'Beginner',
        skillDescription: 'SkillDescription',
    },
    {
        skillName: 'SQL',
        skillLevel: 'Intermediate',
        skillDescription: 'SkillDescription',
    },
    {
        skillName: 'React',
        skillLevel: 'Beginner',
        skillDescription: 'SkillDescription',
    },
]

let isRetrievingData = false;
function getProfileDataFromDb(uid, setUserProfile) {

    if (isRetrievingData) return;

    isRetrievingData = true;
    db.collection('users').doc(uid)
        .get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                console.log(data);
                setUserProfile({
                   city: data.city,
                    displayName: data.displayName,
                    bio: data.bio 
                });
            }
        });
}

async function getProfileDataAsync(setUserProfile) {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) return;
        getProfileDataFromDb(user.uid, setUserProfile);
    });
}


let isRetrievingSkillData = false;
function getSkillDataFromDB(uid, setUserSkills) {

    if (isRetrievingSkillData) return;

    isRetrievingSkillData = true;
    db.collection('users').doc(uid).collection('Skills')
        .get().then(snapshot => {
            const skills = [];
            snapshot.forEach(doc => {
              console.log(doc.id, doc.data());
              skills.push(doc.data());
            });
            console.log('Skills', skills);
            setUserSkills(skills);
        });
}

async function getUserSkillDataAsync(setUserSkills) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) return;
    getSkillDataFromDB(user.uid, setUserSkills);
  })
}
