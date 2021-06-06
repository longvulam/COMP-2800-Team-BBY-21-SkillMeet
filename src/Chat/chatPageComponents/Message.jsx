/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import { Fragment, useEffect } from "react";
import { auth } from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

    currentUserStyle: {
        padding: '7px 7px 7px 7px',
        // textAlign: 'right',
        maxWidth: '70vw',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        // marginRight: '.5em',
        // marginLeft: '30vw',
    },
    otherUserStyle: {
        padding: '7px 7px 7px 7px',
        // textAlign: 'left',
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        maxWidth: '70vw',
        // marginLeft: '.5em',
    },
    currentUserDateStyle: {
        textAlign:'center',
        marginTop: '1.5em',
    },
    otherUserDateStyle: {
        textAlign:'center',
        marginTop: '1.5em',
    },
    currentUserAvatarStyle: {
        margin: '.5em',
        marginBottom:'0',
    },
    otherUserAvatarStyle: {
        margin: '.5em',
        marginBottom:'0',
    },
    currentUserMessageWrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'flex-end',
    },
    otherUserMessageWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'flex-end',
    },
    currentUserMsg: {
        maxWidth:'65vw',
        // whiteSpace: 'pre-line',
    },
    otheruserMsg:{
        maxWidth:'65vw',
        // whiteSpace: 'pre-line',
    }
}));

/** Format the date for output. */
function format(date) {
    let formattedDate = (date.getMonth() + 1) + "-" + date.getDate();
    formattedDate += " " + date.getHours() + ":" + date.getMinutes();
    return formattedDate;
}

/**
 * Functional component built using Material UI components to create a message.
 */
const Message = (props) => {
    const { content, from, timeStamp, avatar, index, lastIndex } = props;
    const classes = useStyles();

    const dateStr = format(new Date(timeStamp));
    const message = content.replace("\\n", `
    `);

    useEffect(()=> {
        if (index == lastIndex) {
            window.location.href = "#msg_" + lastIndex;
        }
    }, [])
    
    const avatarStyle = from === auth.currentUser.uid ? classes.currentUserAvatarStyle : classes.otherUserAvatarStyle;
    return (
        <Fragment >
             <Typography variant="subtitle2" className={from === auth.currentUser.uid ? classes.currentUserDateStyle : classes.otherUserDateStyle}>{dateStr}</Typography>
            <div className={from === auth.currentUser.uid ? classes.currentUserMessageWrapper : classes.otherUserMessageWrapper}>
                    <Avatar 
                        className={avatarStyle}
                        src={avatar} alt='Pic' />
                <Paper 
                    id={"msg_" + index} 
                    className={avatarStyle}>
                    <Typography 
                        variant="body1"
                        className={avatarStyle}>
                    {message}
                    </Typography>
                </Paper>
            </div>
        </Fragment>
    );
}

export default Message;
