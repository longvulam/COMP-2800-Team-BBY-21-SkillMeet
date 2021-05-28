import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar, Grid, Snackbar } from '@material-ui/core';
import ProfileBio from './profileComponents/ProfileBio';
import EditButton from './profileComponents/ProfileEditButton';
import FacebookBtn from './profileComponents/ProfileFacebookButton';
import TwitterBtn from './profileComponents/ProfileTwitterButton';
import LogOutButton from './profileComponents/LogOutButton';
import { OtherUserButtons } from './profileComponents/OtherUserButtons';
import { ProfileAlert } from './profileComponents/ProfileAlert';
import { PersonalInfo } from './profileComponents/PersonalInfo';
import { SkillsList } from './SkillsList';

import LoadingSpinner from '../common/LoadingSpinner';
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
    const history = useHistory();
    const { uid } = useParams();
    const classes = useStyles();
    const location = useLocation();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    const [profileData, setProfileData] = useState();

    const openSnackbar = !!location.state && !!location.state.saveSuccess;

    const [successOpen, setSuccessOpen] = useState(openSnackbar);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        setSuccessOpen(false);
    };

    async function afterLoaded(userProfile, userFriendDoc) {
        if (uid) {
            const userFriend = userFriendDoc.data();
            let isPendingFriendShip = false;

            if (userFriend.hasOwnProperty("isConfirmed")) {
                isPendingFriendShip = userFriend.isConfirmed === false;
            }

            if (userFriend.hasOwnProperty("isPending")) {
                isPendingFriendShip = userFriend.isPending === true;
            }
            userProfile.isPending = isPendingFriendShip;
            setIsFriend(userFriendDoc.exists && !isPendingFriendShip);
        }
        setProfileData(userProfile);
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
                        setLoading={setIsLoadingData}
                        profileData={profileData} />}

                <div className={classes.avatarWrap}>
                    <Avatar
                        alt="Profile Picture"
                        src={profileData.avatar}
                        className={classes.avatar} />
                </div>

                <PersonalInfo userProfile={profileData} />

                <Grid container
                    direction="column"
                    spacing={1}
                    style={{
                        margin: 'auto',
                        width: '95vw',
                        alignItems: 'center',
                    }}>
                    <SkillsList userSkills={profileData.skills} />
                    <Grid item xs={12}
                        style={{
                            width: '100%'
                        }}>
                        <ProfileBio
                            editable={false}
                            bio={profileData.bio} />
                    </Grid>
                </Grid>
                <Snackbar
                    open={successOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}>
                    <ProfileAlert onClose={handleClose} severity="success">
                        Saved Successfully!
                    </ProfileAlert>
                </Snackbar>
            </div>
    );
}

async function loadProfile(uid, callback) {
    const currentUser = await waitForCurrentUser();

    const res = await Promise.all([
        getCurrentUserDataAsync(uid),
        uid ? getChatRoom(currentUser.uid, uid) : async () => false
    ]);

    const userProfileData = res[0];
    if (!uid) {
        callback(userProfileData, undefined);
        return;
    }

    const chatRooms = res[1];
    if (chatRooms.length === 1) {
        userProfileData.chatRoomId = chatRooms[0].id;
    }
    const friendDoc = await db.collection('users').doc(currentUser.uid)
        .collection('Friends').where('friendID', '==', uid)
        .get();

    callback(userProfileData, friendDoc.docs[0]);
}

/**
 * @return {Array}
 */
async function getChatRoom(currentUserId, uid) {
    if (!uid) return undefined;

    const roomsSnapshot = await db.collection('chatrooms')
        .where('uids', 'array-contains', currentUserId)
        .get();

    const roomsData = roomsSnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } });
    const bothUids = [currentUserId, uid];
    return roomsData.filter(room => room.uids.every(id => bothUids.includes(id)));
}

function CurrentUserButtons(props) {
    const { } = props;
    const classes = useStyles();

    return (
        <div className={classes.buttonsWrap}>
            <TwitterBtn style = {{
                height: '2.5em',
                width: '2.5em',
                marginTop: '2vw',
                marginRight: '3vw'
            }}/>
            <FacebookBtn
                style={{
                    marginRight: '50vw',
                    marginTop: '2vw',
                    height: '2.5em',
                    width: '2.5em',
                }} />
            <LogOutButton />
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


