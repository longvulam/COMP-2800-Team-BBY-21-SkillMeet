import React from 'react';
import FriendsPageNav from './friendsClasses/friendsPageNav';
import Grid from '@material-ui/core/Grid';

import Friend from './friendsClasses/FriendCard';
export default function FriendsPage() {
  const data = friendData;
  return (
    <>
      <FriendsPageNav/>
      <div
        style={{
          position:'fixed',
          top:'3em',
          width:'100vw',
          overflowY:'scroll',
          overFlowX:'hidden',
        }}>
        <Grid container direction="column" spacing = {3}
        style={{
          margin: 'auto',
          marginTop: '2vh',
          width: '95vw',
          alignItems: 'center',
        }}>
        {data.map(friendInfo => {
          const { Name } = friendInfo;
          return (
            <Grid item xs={12}
            key={Name} 
            style={{
              width:'100%',
            }}>
            <Friend name={Name}/>
            </Grid>
          );
        })}
        </Grid>
      </div>
    </>
  );

}

const friendData=[
  {Name:'Carly Orr'},
  {Name:'Chrstopher Thompson'},
  {Name:'Owen Arando'},
  {Name:'Dustin Lott'},
  {Name:'Arunab Singh'},
  {Name:'Lam Long Vu'},
];
