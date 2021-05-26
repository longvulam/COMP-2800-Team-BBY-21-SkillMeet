import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar, Grid, Snackbar } from '@material-ui/core';
import ProfileBio from './profileComponents/ProfileBio';
import EditButton from './profileComponents/ProfileEditButton';
import LogOutButton from './profileComponents/LogOutButton';
import { OtherUserButtons } from './profileComponents/OtherUserButtons';
import { Alert } from './profileComponents/profileAlert';
import { PersonalInfo } from './profileComponents/PersonalInfo';
import { SkillsList } from './SkillsList';

import LoadingSpinner from '../classes/LoadingSpinner';
import { db, getCurrentUserDataAsync, waitForCurrentUser } from '../firebase';

export const useStyles = makeStyles((theme) => ({
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
        color: theme.palette.primary.dark,
    },
}));

export default function Profile() {
    const { uid } = useParams();
    const classes = useStyles();
    const location = useLocation();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    const [userProfile, setUserProfile] = useState();

    const openSnackbar = !!location.state && !!location.state.saveSuccess;

    const [successOpen, setSuccessOpen] = useState(openSnackbar);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        setSuccessOpen(false);
    };

    async function afterLoaded(userProfile, userFriendDoc) {
        if (uid) {
            const userFriend = userFriendDoc.data();
            const isPendingFriendShip = userFriend.isPending || !userFriend.isConfirmed;
            userProfile.isPending = isPendingFriendShip;
            setIsFriend(userFriendDoc.exists && !isPendingFriendShip);
        }
        setUserProfile(userProfile);
        setIsLoadingData(false);
    }

    useEffect(() => loadProfile(uid, afterLoaded), []);

    return (
        isLoadingData ? <LoadingSpinner /> :
            <div className={classes.profilePage}
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 4em)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                }}>

                {!uid ? <CurrentUserButtons /> :
                    <OtherUserButtons
                        isFriend={isFriend}
                        isPending={userProfile.isPending}
                        friendId={uid} />}

                <div className={classes.avatarWrap}>
                    <Avatar
                        alt="Profile Picture"
                        src={userProfile.avatar}
                        className={classes.avatar} />
                </div>

                <PersonalInfo userProfile={userProfile} />

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
                <Snackbar
                    open={successOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>
            </div>
    );
}

async function loadProfile(uid, callback) {
    const res = await Promise.all([
        getCurrentUserDataAsync(uid),
        waitForCurrentUser()
    ])
    const userProfileData = res[0];
    const currentUser = res[1];


    const friendDoc = await db.collection('users').doc(currentUser.uid)
        .collection('Friends').where('friendID', '==', uid)
        .get();

    callback(userProfileData, friendDoc.docs[0]);
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


