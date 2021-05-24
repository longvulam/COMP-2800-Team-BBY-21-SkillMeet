import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';

export default function FriendCard (props) {
    
  return (
    <>
      <div style={{
        display:'flex',
        justifyContent: 'space-around',
        alignItems:'center',
        width:'95%',
        margin:'auto',
      }}>
        <Avatar style={{
          width:'3em',
          height:'3em',
        }}alt={props.name} />

       <div style={{
        display:'flex',
        alignItems:'center',
        }}>
          <Typography variant="body1"
            style={{
              textAlign:'center',
              width:'30vw',
            }}>
            {props.name}
          </Typography>
        </div>
        <IconButton>
          <MessageIcon />
        </IconButton>
      </div>
    </>
  );
}