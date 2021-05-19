import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import { db, auth } from '../firebase';
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
    { skillName: "", skillLevel: "", skillDescription: "" },
  ])



  const handleChangeInput = (index, event) => {
    const values = [...skillFields];
    values[index][event.target.name] = event.target.value;
    setSkillFields(values);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName.length == 0 || bio.length == 0 || city.length == 0) return;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        db.collection('users').doc(user.uid).update({
          "displayName": displayName,
          "Bio": bio,
          "City": city
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

  // const addUserDetails = () => {

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       db.collection('users').doc(user.uid)
  //         .update({
  //           "Bio": bio,
  //           "cityName": city,
  //           "displayName": displayName,
  //         })
  //     }
  //   });

  //   addSkills();
  // }

  // const addSkills = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       db.collection('users').doc(user.uid).collection("Skills").doc("skill1").set({
  //         "skillName": skillOneName,
  //         "skillLevel": skillOneLevel,
  //         "skillDescription": skillOneDesc,
  //       }).catch((err) => {
  //         console.log(err)
  //       })
  //     }
  //   })
  // }

  return (

    // <div className="create-profile-form">
    //   <form>
    // <input type="button" className="createProfileBtn" onClick={addUserDetails} value="Create Profile" /> */


    <Container>
      <h1>Profile Info Form</h1>
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
          className="bioInfo"
          label="Bio*"
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
              <h5 style={{ textAlign: 'center' }}>Skill Info</h5>

              <Grid xs={12}>
                <TextField
                  name="skillName"
                  label="Skill Name"
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
                  name="skillDescription"
                  label="skillDescription"
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
    </Container>

    // </div>
  )
}


export default Create;