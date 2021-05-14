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
    },
    textField: {
        border: '1px solid blue',
    },
    input: {

    },
}));

function changeState() {
    //replacable with onChange, and maybe the function with params that Lam talked about    
    // let numSkillsSearched = (document.querySelectorAll('MuiAutocomplete-root').childElementCount) - 2;

    // let skillSearch = [numSkillsSearched];
    // for (let i = 0; i < numSkillsSearched; i++) {
    //     skillSearch[i] = document.querySelectorAll("[data-tag-index='i']".child.text());

    //// let skillSearch = ["juggling"];

    ////     db.collectionGroup('powers').where('name', 'in', skillSearch)
   // //         .get()
   // //         .then(snapshot => {
   /// //             const users = []
   // //             snapshot.forEach(doc => {
   // //                 const data = doc.data()
  //  //                 users.push(data)
   // //             })
  //  //             this.setState({ users: users })
  //  //             console.log(users)
  //  //         })
  //  //         .catch(error => console.log(error)) 

    // db.collection('users').doc("Paul").set({
    //     name: "Paul",
    //     age: "old"
    // })
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedSkills: []
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        //replacable with onChange, and maybe the function with params that Lam talked about    
        // let numSkillsSearched = (document.querySelectorAll('MuiAutocomplete-root').childElementCount) - 2;
    
        // let skillSearch = [numSkillsSearched];
        // for (let i = 0; i < numSkillsSearched; i++) {
        //     skillSearch[i] = document.querySelectorAll("[data-tag-index='i']".child.text());
    
        // let skillSearch = ["juggling", "running"];
        let skillSearch = this.state.selectedSkills.map(obj => obj.title.toLowerCase());
        console.log(skillSearch);
        db.collection('users')
            .where('skills', 'array-contains-any', skillSearch)
            .get()
            .then(snapshot => {
                const users = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    users.push(data)
                })
                this.setState({ users: users })
                console.log(users)
            })
            .catch(error => console.log(error)) 
    
        // db.collection('users').doc("Paul").set({
        //     name: "Paul",
        //     age: "old"
        // })
    }

    updateSelectedSkills(event, currentSelectedSkills){
        this.setState({
            selectedSkills: currentSelectedSkills
        });
    }

    render() {
        const { classes } = this.props;
        const searchList = [];

        return (
            <div>
                <div className={classes.bar}>
                    <br />
                    <Autocomplete
                        onChange={this.updateSelectedSkills.bind(this)}
                        multiple
                        id="tags-standard"
                        options={skillsList}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="autocomplete-text-field"
                                variant="standard"
                                label="&#8981;
                            Enter Skills to Search For Here:"
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
                </div>
                <div>
                    <Button color='primary' variant='outlined' style={{ marginLeft: '48%' }} onClick={this.changeState}> Search </Button>
                </div>
                <br />
                {/* we could maybe do the following to extract the parent document:
                
                db.collectionGroup("subcollection").whereEqualTo("name", searchText).get()
            .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                @Override
                public void onComplete(@NonNull Task<QuerySnapshot> task) {
                    if(task.isSuccessful()){
                        //here I want to get the parent id of all results
                    }
                }
            }); */}
                <div>
                    {
                        this.state.users &&
                        this.state.users.map(user => {
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
                                                            {user.firstName} {user.lastName}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Skills
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {user.skills[0]}, {user.skills[1]}, {user.skills[2]}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2">
                                                            {user.city}
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
    { title: 'Bowling' },
    { title: 'Dancing' },
    { title: 'Long Distance Running' },
    { title: 'Hurdling' },
    { title: 'Beekeeping' },
    { title: 'Taxidermy' },
    { title: 'Parkour' },
    { title: 'Baking' },
    { title: 'Cooking' },
    { title: 'Sailing' },
    { title: 'Photography' },
    { title: 'Painting' },
    { title: 'Dog Training' },
    { title: 'Horse Breeding' },
    { title: 'Python' },
    { title: 'C#' },
    { title: 'Fundamental Analysis' },
    { title: 'Public Speaking' },
    { title: 'Technical Analysis' },
    { title: 'Rock Climbing' },
    { title: 'Java' },
    { title: 'Kite Boarding' },
    { title: 'Juggling' },
    { title: 'Scrapbooking' },
    { title: 'Astrology' },
    { title: 'Berry Gathering' },
    { title: 'Snowshoeing' },
    { title: 'Flute' },
    { title: 'Battling Robots' },
    { title: 'Wine Making' },
    { title: 'Poker' },
];
