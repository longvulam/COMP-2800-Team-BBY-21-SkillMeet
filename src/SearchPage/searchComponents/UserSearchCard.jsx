import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { db, getCurrentUserDataAsync } from '../../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import { userSearchCardStyles } from '../../common/PageStyles';

/**
 * Creates a Mui alert based on what is passed through the props
 * @param {*} props props passed into the function.
 * @returns an alert with the props
 */
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Functional component that display the individual user information of users that
 * match the skills set in the search bar.  A user's picture, name, city, skill, 
 * and skill level are all displayed.
 * @param {*} props props passed to the function
 */
export default function UserSearchCard(props) {
    const classes = userSearchCardStyles();
    const history = useHistory();
    const { name, city, skillName, skillLevel, id, avatar, isFriending } = props;

    const [requestSent, setRequestSent] = React.useState(false);

    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        Transition: 'fade',
    });
    const { open, vertical, horizontal, Transition } = snackbarState;

    /**
     * sets the snackbar state to true, position it, and style it.
     */
    function handleSnackbarOpen() {
        setSnackbarState({
            open: true,
            vertical: 'bottom',
            horizontal: 'center',
            Transition: 'fade',
        });
    }

    /**
     * sets the snackbar state to false.
     */
    function handleSnackbarClose() {
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
    }

    /**
     * runs the add friend function and shows a snackbar while also setting a boolean
     * to true indicating a request was sent after the addfriend button is clicked. 
     */
    function handleAddClick() {
        setRequestSent(true);
        addFriend();
        handleSnackbarOpen();
    }

    /**
     * request to add a friend by creating document in each user's 'Friends' collection
     * with booleans indicating the pending/unconfirmed status and the opposite user's
     * user id.
     */
    async function addFriend() {
        const currentUserData = await getCurrentUserDataAsync();

        db.collection('users').doc(currentUserData.uid).collection('Friends').doc('sent' + id)
            .set({
                isConfirmed: false,
                friendID: id,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        db.collection('users').doc(id).collection('Friends').doc('received' + currentUserData.uid)
            .set({
                isPending: true,
                friendID: currentUserData.uid
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
    return (
        <>
            <Paper className={classes.paper} elevation={4} key={id}>
                <Grid container direction="column"
                    spacing={1} className={classes.infoGrid}>

                    <Grid item className={classes.firstGridItem}>
                        <div className={classes.avatarNameLocation}>
                            <Avatar
                                className={classes.avatar}
                                alt="Profile Pic"
                                src={avatar}
                                onClick={() => history.push('/profile/' + id)}
                            />
                            <div className={classes.nameAndLocation}>
                                <Typography variant="h6">{name}</Typography>
                                <Typography variant="subtitle1">{city}</Typography>
                            </div>
                        </div>
                        <Fab
                            disabled={isFriending}
                            id={id + "_btn"}
                            className={classes.fab}
                            color={requestSent ? "default" : "primary"}
                            onClick={() => handleAddClick()}>
                            <PersonAddIcon className={classes.addIcon} />
                        </Fab>
                    </Grid>

                    <Grid item className={classes.skillGridItem}>
                        <div className={classes.skills}>
                            <Typography variant="h6" display='inline'>{skillName}</Typography>
                            <Typography variant="subtitle1" display='inline' className={classes.skillLevel}>{skillLevel}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                autoHideDuration={1500}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleSnackbarClose}
                TransitionComponent={Transition}
            >
                <Alert severity="info">Added {name}</Alert>
            </Snackbar>
        </>
    );
}
