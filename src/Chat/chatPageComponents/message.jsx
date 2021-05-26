import { Fragment } from "react";
import { auth } from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleFilledWhiteTwoTone } from "@material-ui/icons";
import { Avatar, Button, IconButton, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    currentUserStyle: {
        padding: '10px 7px 10px 7px',
        textAlign: 'right',
        maxWidth: '70vw',
        // marginRight: '.5em',
        // marginLeft: '30vw',
    },
    currentUserDateStyle: {
        textAlign: 'right',
        fontSize: 'small',
        paddingTop: '7px',
        color: 'slategrey',
        marginRight: '.6em',
        marginTop: '-.4em',
    },
    otherUserStyle: {
        padding: '10px 7px 10px 7px',
        textAlign: 'left',
        backgroundColor: 'blue',
        color: 'white',
        maxWidth: '70vw',
        // marginLeft: '.5em',
    },
    otherUserDateStyle: {
        textAlign: 'left',
        fontSize: 'small',
        paddingTop: '7px',
        color: 'slategrey',
        marginLeft: '.6em',
        marginTop: '-.4em',
    },
    currentUserAvatarStyle: {
        margin: '.5em',
    },
    otherUserAvatarStyle: {
        margin: '.5em',
    },
    currentUserMessageWrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    otherUserMessageWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
}));


function format(date) {
    let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    formattedDate += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formattedDate;
}

const Message = (props) => {
    const { content, from, timeStamp, avatar } = props;
    const classes = useStyles();

    const dateStr = format(new Date(timeStamp));
    const split = content.split("\\n");
    return (
        <Fragment>
            <div className={from === auth.currentUser.uid ? classes.currentUserMessageWrapper : classes.otherUserMessageWrapper}>
                    <Avatar className={from === auth.currentUser.uid ? classes.currentUserAvatarStyle : classes.otherUserAvatarStyle}
                    src={avatar} alt='Pic' />
                <Paper className={from === auth.currentUser.uid ? classes.currentUserStyle : classes.otherUserStyle}>
                    {split.map((value, index) => {
                        return (

                            <Fragment key={index}>
                                {value}
                                <br />
                            </Fragment>

                        );
                    })}
                </Paper>
            </div>
            <div className={from === auth.currentUser.uid ? classes.currentUserDateStyle : classes.otherUserDateStyle}>{dateStr}</div>
        </Fragment>
    );
}

export default Message;