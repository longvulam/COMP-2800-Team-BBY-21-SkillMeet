import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import { db, auth } from '../firebase';
import $ from "jquery";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { Redirect, useHistory } from "react-router-dom";

import '../../src/LandingPageStyles/Landing_Page_Styles.css';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    }
  },
  button: {
    margin: theme.spacing(2),
  }
}))


const Create = () => {
  const classes = useStyles();

  const history = useHistory();
  const [skillFields, setSkillFields] = useState([
    { skillName: "", skillLevel: "", skillDescription: "" },
  ])

  let count = 0;
  const handleChangeInput = (index, event) => {
    const values = [...skillFields];
    values[index][event.target.name] = event.target.value;
    setSkillFields(values);

    if (count == 0 && (skillFields[0].skillName == "beekeeping" || skillFields[0].skillName == "Beekeeping") && skillFields[0].skillLevel == "Expert") {
      count++;
      $("#hiddenEasterEgg2").fadeIn(500, function () {
        window.setTimeout(function () { $('#hiddenEasterEgg2').hide(); }, 2500);
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName.length == 0 || bio.length == 0 || city.length == 0) return;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        db.collection('users').doc(user.uid).update({
          "displayName": displayName,
          "bio": bio,
          "city": city
        }).then(() => {
          for (let i = 0; i < skillFields.length; i++) {
            db.collection('users').doc(user.uid).collection("Skills").doc("Skill" + (i + 1)).set({
              "skillName": skillFields[i].skillName,
              "skillLevel": skillFields[i].skillLevel,
              "skillDescription": skillFields[i].skillDescription
            })
          }
        }).then(value => history.push("/profile"))

      }
    })

  };

  const handleAddFields = () => {
    setSkillFields([...skillFields, { skillName: "", skillLevel: "", skillDescription: "" }])
  }

  const handleRemoveFields = (index) => {
    const values = [...skillFields];
    if (values.length == 1) return;
    values.splice(index, 1);
    setSkillFields(values);
  }


  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  return (
    <div id="profile-form">
      <Container>
        <h6 style={{color: '#1434A4',padding: '5px', textAlign: 'center' }}>Please fill these details to complete your profile setup</h6>
        <form className={classes.root} onSubmit={handleSubmit}>

          <TextField
            autoFocus
            label="Display Name"
            required
            variant="outlined"
            name="displayName"
            className="otherInputs"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <TextField
            multiline
            rows={4}
            className="otherInputs"
            label="Bio"
            required
            value={bio}
            variant="outlined"
            onChange={(e) => setBio(e.target.value)}
          />

          <TextField
            id="city"
            label="City"
            className="otherInputs"
            name="city"
            required
            value={city}
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
          />


          {skillFields.map((skillField, index) => (
            <div key={index}>
              <Grid container spacing={1} style={{
                margin: 'auto',
                marginTop: '2vh',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'lightGrey',
                borderRadius: '5px'
              }}>
                <p style={{color: '#1434A4', fontSize: '14px', padding: '5px', textAlign: 'center' }}>Add a skill to your profile:</p>

                <Grid xs={12}>
                  <TextField
                    name="skillName"
                    label="Skill Name"
                    placeholder="Enter the skill :"
                    variant="outlined"
                    required
                    value={skillField.skillName}
                    onChange={event => handleChangeInput(index, event)}
                  />

                </Grid>
                <Grid xs={12} style={{
                  marginLeft: "2vw"
                }}>

                  <InputLabel id="level">Skill Level</InputLabel>
                  <Select
                    native
                    name="skillLevel"
                    required
                    label="Skill Level"
                    id="level"
                    value={skillField.skillLevel}
                    onChange={event => handleChangeInput(index, event)}
                  >
                    <option aria-label="None" value="Skill Level" />
                    <option value='Expert'>Expert</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                  </Select>
                </Grid>
                <Grid xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    name="skillDescription"
                    label="Skill Description"
                    placeholder="Enter anything you would like to share with others related to the skill:"
                    required
                    variant="outlined"
                    value={skillField.skillDescription}
                    onChange={event => handleChangeInput(index, event)}
                  />
                </Grid>
                <Grid xs={12}>

                  <IconButton
                    style={{
                      fontSize: "0.9em",
                      color: "red"
                    }}
                    onClick={() => handleRemoveFields(index)}
                  >
                    <RemoveIcon />Remove Skill
              </IconButton>
                  <IconButton
                    style={{
                      fontSize: "0.9em",
                      color: "green"
                    }}
                    onClick={() => handleAddFields()}
                  >
                    <AddIcon />Add Skill
              </IconButton>
                </Grid>

              </Grid>


            </div>
          ))}

          <Button
            onClick={handleSubmit}
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit">
            <ProfileIcon />
            Create Profile
          </Button>
        </form>

        <img src="https://media.giphy.com/media/Lg8DWFsoAAUqjv33Bg/giphy.gif" id="hiddenEasterEgg2" alt="spongebob and Patrick"></img>
      </Container>
    </div>
  )
}


export default Create;