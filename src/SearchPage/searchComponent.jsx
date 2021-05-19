import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DustinPic from '../img/dustinPic.jpg';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { fire, db, auth } from '../firebase';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = ((theme) => ({
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
    bar: {
        width: '98vw',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
        marginLeft: '1vw',
        marginBottom: '3rem',
         border:'none',
    },
    textField: {
      border:'none',
    },
    input: {

    },
}));

const currentUserID = auth.currentUser;


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            parents: [],
            selectedSkills: []
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        let skillSearch = this.state.selectedSkills.map(obj => obj.title.toLowerCase());
        console.log(skillSearch);
        db.collectionGroup('Skills')
            .where('skillName', 'in', skillSearch)
            .get()
            .then(snapshot => {
                const users = []
                const parents = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    users.push(data)
                    
                    const parentDocRef = doc.ref.parent.parent
                    console.log(parentDocRef)
                    parentDocRef.get().then(parentSnap => {
                        const parentData = parentSnap.data();
                        
                        parents.push(parentData)
                        this.setState({ parents: parents })
                        console.log(parents)
                    });
                })
                this.setState({ users: users })
                console.log(users)
            })
            .catch(error => console.log(error)) 
    }

    updateSelectedSkills(event, currentSelectedSkills){
        this.setState({
            selectedSkills: currentSelectedSkills
        });
    }

    sendRequest() {
        db.collection('users').doc('OtherUsersId').collection('Friends').doc(currentUserID).set({
        isConfirmed: false
        })
        db.collection('users').doc(currentUserID).collection('Friends').doc('OtherUsersId').set({
            isPending: true
        })
    }


    render() {
        const { classes } = this.props;
        const searchList = [];

        return (
            <div style={{
              position:'fixed',
              top:'1em',
            }}>
                <div style={{
                  width:'100vw',
                  display:'flex',
                  justifyContent:'space-evenly',
                  alignItems:'center',
                }}>
                    <Autocomplete
                        onChange={this.updateSelectedSkills.bind(this)}
                        multiple
                        id="tags-standard"
                        style={{
                          width: 'calc(100vw - 5em)',
                          display:'inline-block',
                          marginLeft:'0.5em',
                        }}
                        options={skillsList}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="autocomplete-text-field"
                                variant="standard"
                                label="&#8981;
                            Enter Skills to Search:"
                                className={classes.textField}
                                placeholder=""
                            //    InputProps={{ ...params.InputProps,
                            //      startAdornment: (
                            //        <InputAdornment position="start">
                            //          <SearchIcon />
                            //        </InputAdornment>
                            //      ),
                            //    }}
                            />
                        )}
                    />
                 
                      <IconButton color='primary' onClick={this.changeState}> 
                        <SearchIcon style={{width:'1.2em', height:'1.2em'}}/> 
                      </IconButton>
         
                </div>
                <div>
                    
                </div>
                <br />
                <div>
                    {
                        this.state.parents &&
                        this.state.parents.map(user => {
                            return (
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
                                                        {user.displayName}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Skills
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            user skills here
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2">
                                                        {user.cityName}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button className={classes.addFriend} onClick={this.sendRequest} uid={auth.currentUser}><PersonAddIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <br />
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Search);

const skillsList = [
    { title: 'Algorithms' },
    { title: 'Big Data' },
    { title: 'Statistical Analysis' },
    { title: 'Modeling' },
    { title: 'Database Design' },
    { title: 'Compiling Statistics' },
    { title: 'Needs Analysis' },
    { title: 'Documentation' },
    { title: 'Database Management' },
    { title: 'Data Mining' },
    { title: 'Networking' },
    { title: 'Security' },
    { title: 'Servers' },
    { title: 'Testing' },
    { title: 'Python' },
    { title: 'C#' },
    { title: 'Fundamental Analysis' },
    { title: 'Public Speaking' },
    { title: 'Technical Analysis' },
    { title: 'React' },
    { title: 'Java' },
    { title: 'Vue' },
    { title: 'Svelte' },
    { title: 'Ruby' },
    { title: 'Javascript' },
    { title: 'JQuery' },
    { title: 'Firebase' },
    { title: 'MongoDB' },
    { title: 'MySQL' },
    { title: 'Game Development' },
    { title: 'Quality Assurance' },
  ];
