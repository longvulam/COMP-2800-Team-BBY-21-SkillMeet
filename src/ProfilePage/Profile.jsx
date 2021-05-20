import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import SkillAccordion from './profileComponents/SkillAccordion';
import ProfileBio from './profileComponents/ProfileBio';
import EditButton from './profileComponents/ProfileEditButton';
import LogOutButton from './profileComponents/LogOutButton';

import { getCurrentUserDataAsync } from '../firebase';

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

    useEffect(() => getCurrentUserDataAsync().then(setUserProfile), []);
    
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

            <NameAndLocationInfo userProfile={userProfile}/>

            <Grid container
                direction="column"
                spacing={1}
                style={{
                    margin: 'auto',
                    marginTop: '2vh',
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

function NameAndLocationInfo(props) {
    const { userProfile } = props;
    return (<Grid key="userProfile" container direction="column" spacing={1}
        style={{
            margin: 'auto',
            marginTop: '2vh',
            alignItems: 'center',
        }}>
        <Grid item xs={12}>
            <InputBase
                key="userName"
                value={userProfile.displayName}
                readOnly={true}
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
                readOnly={true}
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
    </Grid>)
}

function SkillsList(props) {
    const { userSkills } = props;
    return userSkills.map(accordion => {
        const { skillName, skillLevel, skillDescription } = accordion;
        return (
            <Grid key={skillName} item xs={12}>
                <SkillAccordion
                    skillName={skillName}
                    skillLevel={skillLevel}
                    skillDescription={skillDescription}
                />
            </Grid>
        );
    })

}
