import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// https://material-ui.com/components/cards/
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

  