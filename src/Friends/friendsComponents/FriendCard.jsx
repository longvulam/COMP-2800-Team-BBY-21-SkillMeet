import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import { useHistory } from 'react-router';

export default function FriendCard(props) {
    const history = useHistory();
    const { friendId, name } = props;

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '95%',
                    margin: 'auto',
                }}>
                <Avatar
                    onClick={()=>history.push('/profile/' + friendId)}
                    style={{
                        width: '3em',
                        height: '3em',
                    }}
                    alt={name} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography variant="body1"
                        style={{
                            textAlign: 'center',
                            width: '30vw',
                        }}>
                        {name}
                    </Typography>
                </div>
                <IconButton>
                    <MessageIcon />
                </IconButton>
            </div>
        </>
    );
}