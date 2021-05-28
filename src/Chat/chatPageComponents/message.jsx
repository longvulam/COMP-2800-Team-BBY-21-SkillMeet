import { Fragment } from "react";
import { auth } from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleFilledWhiteTwoTone } from "@material-ui/icons";
import { Avatar, Button, IconButton, InputBase, Paper } from '@material-ui/core';
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


function format(date) {
    let formattedDate = (date.getMonth() + 1) + "-" + date.getDate();
    formattedDate += " " + date.getHours() + ":" + date.getMinutes();
    return formattedDate;
}

// const Message = (props) => {
//     const { content, from, timeStamp, avatar } = props;
//     const classes = useStyles();

//     const dateStr = format(new Date(timeStamp));
//     const split = content.split("\\n");
//     return (
//         <Fragment>
//              <Typography variant="subtitle2" className={from === auth.currentUser.uid ? classes.currentUserDateStyle : classes.otherUserDateStyle}>{dateStr}</Typography>
//             <div className={from === auth.currentUser.uid ? classes.currentUserMessageWrapper : classes.otherUserMessageWrapper}>
//                     <Avatar className={from === auth.currentUser.uid ? classes.currentUserAvatarStyle : classes.otherUserAvatarStyle}
//                     src={avatar} alt='Pic' />
//                 <Paper className={from === auth.currentUser.uid ? classes.currentUserStyle : classes.otherUserStyle}>
//                     {split.map((value, index) => {
//                         return (

//                             <Fragment key={index}>
//                                 {value}
//                                 <br />
//                             </Fragment>

//                         );
//                     })}
//                 </Paper>
//             </div>
//         </Fragment>
//     );
// }


const Message = (props) => {
    const { content, from, timeStamp, avatar } = props;
    const classes = useStyles();

    const dateStr = format(new Date(timeStamp));
    const message = content.replace("\\n", `
    `);
    return (
        <Fragment >
             <Typography variant="subtitle2" className={from === auth.currentUser.uid ? classes.currentUserDateStyle : classes.otherUserDateStyle}>{dateStr}</Typography>
            <div className={from === auth.currentUser.uid ? classes.currentUserMessageWrapper : classes.otherUserMessageWrapper}>
                    <Avatar className={from === auth.currentUser.uid ? classes.currentUserAvatarStyle : classes.otherUserAvatarStyle}
                    src={avatar} alt='Pic' />
                <Paper className={from === auth.currentUser.uid ? classes.currentUserStyle : classes.otherUserStyle}>
                  <Typography 
                  variant="body1"
                  className={from === auth.currentUser.uid ? classes.currentUserMsg : classes.otherUserMsg}>
                    {message}
                  </Typography>
                </Paper>
            </div>
        </Fragment>
    );
}

export default Message;