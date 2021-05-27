import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      maxWidth: 305,
      marginBottom: '2rem',
    },
    media: {
      height: 180,
    },
  });
  
  export default function Team2(props) {
    const { memberPic, memberName, memberBio } = props;


    const classes = useStyles();
  
    return (
      <Card raised="true" className={classes.root}>
          <CardMedia
            className={classes.media}
            image= {memberPic}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {memberName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {memberBio}
            </Typography>
          </CardContent>
      </Card>
    );
  }

  