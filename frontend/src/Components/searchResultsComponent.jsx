import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DustinPic from '../dustinPic.jpg';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: '98%',
        backgroundColor: 'lightblue',
    },
    image: {
        width: 64,
        height: 64,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    addFriend: {
        transform: 'translate(-25%, 250%)',
    },
    pic: {
        transform: 'translate(0, 25%)',
    },
}));

export default function Results() {
    const classes = useStyles();

    return (
        <div>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={3}  className={classes.pic}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="ProfilePic" src={DustinPic} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Fakey Fakerson
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Skills
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Poker, Battling Robots, Wine Making
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Tokyo
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.addFriend}><PersonAddIcon /></Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
        </div>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={3} className={classes.pic}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="ProfilePic" src={DustinPic} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Snakey Snakerson
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Skills
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Flute, Berry Gathering, Snow Shoeing
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Vancouver
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.addFriend}><PersonAddIcon /></Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
        </div>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={3} className={classes.pic}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="ProfilePic" src={DustinPic} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Lakey Lakerson
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Skills
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Scrapbooking, Astrology, Java
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Jasper
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.addFriend}><PersonAddIcon /></Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
        </div>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={3} className={classes.pic}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="ProfilePic" src={DustinPic} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Makey Makerson
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Skills
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Stone Carving, Juggling, Kite Boarding
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Vancouver
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.addFriend}><PersonAddIcon /></Button>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
        </div>
    </div>
);

}