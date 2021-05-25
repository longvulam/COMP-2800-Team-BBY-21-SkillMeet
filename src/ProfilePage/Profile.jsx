import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar, Grid, InputBase, Button, IconButton } from '@material-ui/core';

import SkillAccordion from './profileComponents/SkillAccordion';
import ProfileBio from './profileComponents/ProfileBio';
import EditButton from './profileComponents/ProfileEditButton';
import LogOutButton from './profileComponents/LogOutButton';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';

import { db, getCurrentUserDataAsync, waitForCurrentUser } from '../firebase';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../classes/LoadingSpinner';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    buttonsWrap: {
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
    name: {
      color:theme.palette.primary.dark,
    },
}));

export default function Profile() {
    const { uid } = useParams();
    const classes = useStyles();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    const [userProfile, setUserProfile] = useState();

    useEffect(() => Promise.all([
        getCurrentUserDataAsync(uid).then(setUserProfile),
        waitForCurrentUser()
    ]).then(res => {
        const currentUser = res[1];
        if (!currentUser || !uid) {
            setIsLoadingData(false);
            return;
        }

        db.collection('users').doc(currentUser.uid)
            .collection('Friends').where('friendID', '==', uid)
            .get()
            .then(friendDoc => {
                setIsFriend(!friendDoc.empty);
                setIsLoadingData(false);
            });
    }), []);

    return (
        isLoadingData ? <LoadingSpinner /> :
            <div className ={classes.profilePage}
            style={{
                width: '100vw',
                height: 'calc(100vh - 4em)',
                overflowY: 'scroll',
                overflowX: 'hidden',
            }}>
                {!uid ? <CurrentUserButtons /> : <OtherUserButtons isFriend={isFriend} />}

                <div className={classes.avatarWrap}>
                    <Avatar
                        alt="Profile Picture"
                        src="/static/images/avatar/1.jpg"
                        className={classes.avatar} />
                </div>

                <NameAndLocationInfo userProfile={userProfile} />

                <Grid container
                    direction="column"
                    spacing={1}
                    style={{
                        margin: 'auto',
                        width: '95vw',
                        alignItems: 'center',
                    }}>
                    <SkillsList userSkills={userProfile.skills} />
                    <Grid item xs={12}
                        style={{
                            width: '100%'
                        }}>
                        <ProfileBio bio={userProfile.bio} />
                    </Grid>
                </Grid>

            </div>
    );
}

function OtherUserButtons(props) {
    const { isFriend } = props;

    const classes = useStyles();

    return (
        <div className={classes.buttonsWrap}>
            {isFriend ?
                (<IconButton>
                    <MessageIcon />
                </IconButton>
                ) :
                (<Button>
                    <PersonAddIcon />
                </Button>)
            }
        </div>)
}

function CurrentUserButtons(props) {
    const { } = props;
    const classes = useStyles();

    return (
        <div className={classes.buttonsWrap}>
            <LogOutButton
            />
            <EditButton
                style={{
                    marginRight: '4vw',
                    marginTop: '2vw',
                    height: '2.5em',
                    width: '2.5em',
                }}
            />
        </div>
    )
}

function NameAndLocationInfo(props) {
    const { userProfile } = props;
    const classes = useStyles();
    return (
        <Grid key="userProfile"
            container
            direction="column"
            spacing={1}
            style={{
                margin: 'auto',
                marginTop: '2vh',
                alignItems: 'center',
            }}>
            <Grid item xs={12}
              key="userName"
            >
                <Typography
                  variant='h6'
                  className={classes.name}
                >
                  {userProfile.displayName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
               <Typography
                variant='subtitle1'
               >
                 {userProfile.city}
               </Typography>
            </Grid>
        </Grid>)
}

function SkillsList(props) {
    const { userSkills } = props;
    return userSkills.map(accordion => {
        const { skillName, skillLevel, skillDescription } = accordion;
        return (
            <Grid key={skillName} item xs={12}
            style={{
              width:'100%',
              margin:'auto'
            }}>
                <SkillAccordion
                    skillName={skillName}
                    skillLevel={skillLevel}
                    skillDescription={skillDescription}
                />
            </Grid>
        );
    })
}
