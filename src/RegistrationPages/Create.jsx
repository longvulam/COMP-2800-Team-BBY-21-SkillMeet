import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import { db, auth, storage } from '../firebase';
import $ from "jquery";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Grid, InputBase, Button, IconButton, Fab } from '@material-ui/core';
import { Redirect, useHistory } from "react-router-dom";

import '../../src/LandingPageStyles/Landing_Page_Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    }
  },
  button: {
    margin: theme.spacing(2),
  },
  avatarWrap: {
    width: '100%',
    height: '12em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '7.5em',
    width: '7.5em',
  },
  editAvatarbtn: {
    marginLeft: '12em',
    marginTop: '-7em',
  }
}))


const Create = () => {
  const classes = useStyles();

  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');
  const [cityError, setCityError] = useState('');
  const [avatarImageUrl, setAvatarImageUrl] = useState('');




  const [skillFields, setSkillFields] = useState([
    { skillName: "", skillLevel: "Expert", skillDescription: "" },
  ])

  let count = 0;
  const handleChangeInput = (index, event) => {
    const values = [...skillFields];
    values[index][event.target.name] = event.target.value;
    setSkillFields(values);

    for (let i = 0; i < skillFields.length; i++) {
      if (count == 0 && (skillFields[i].skillName == "beekeeping" || skillFields[i].skillName == "Beekeeping") 
        && skillFields[i].skillLevel == "Expert" && skillFields[i].skillDescription == "" ) {
        count++;
        $("#hiddenEasterEgg2").fadeIn(500, function () {
          window.setTimeout(function () { $('#hiddenEasterEgg2').hide(); }, 2500);
        });
      }
    }
  }

  const validate = () => {
    let nameError = "";
    let bioError = "";
    let cityError = "";
    
    
    if(displayName.length < 3){
      setNameError("Display Name must be 4 characters or longer");
      return false
    } else if (bio.length < 16){
      setBioError("Bio must be 16 characters or longer");
      return false
    } else if (city.length < 1){
      setCityError("Please fill this field");
      return false
    } else {
      return true;
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // const isValid = validate();{
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
  
          db.collection('users').doc(user.uid).update({
            "displayName": displayName,
            "bio": bio,
            "city": city,
            "avatar": avatarImageUrl
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

  const handleImageChange = async (event) => {
    const avatarImage = event.target.files[0];
    const storageRef = storage.ref();
    const avatarImageRef = storageRef.child(avatarImage.name);
    await avatarImageRef.put(avatarImage);
    const avatarImageUrl = await avatarImageRef.getDownloadURL();
    setAvatarImageUrl(avatarImageUrl);
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('uploadImage');
    fileInput.click();
  }

  return (
    <div id="profile-form">
      <Container style={{ textAlign: 'center' }}>
        <h6 style={{ color: '#1434A4', padding: '5px', textAlign: 'center' }}>Please fill these details to complete your profile setup</h6>
        <form className={classes.root} onSubmit={handleSubmit}>

          <div className={classes.avatarWrap}>
            <Avatar
            id="avatarPic"
            alt="Profile Picture"
            src={avatarImageUrl}
            className={classes.avatar} />
          </div>
          <div>
            <input type="file" id="uploadImage" onChange={handleImageChange} hidden="hidden"/>
            <Fab size="small" onClick={handleEditPicture} className={classes.editAvatarbtn}>
              <EditIcon />
            </Fab>   
          </div>

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
          <div style = {{fontSize: '0.8em', color: 'red'}}>
            {nameError}
          </div>

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
          <div style = {{fontSize: '0.8em', color: 'red'}}>
            {bioError}
          </div>


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
          <div style = {{fontSize: '0.8em', color: 'red'}}>
            {cityError}
          </div>


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
                <p style={{ color: '#1434A4', fontSize: '14px', padding: '5px', textAlign: 'center' }}>Add a skill to your profile:</p>

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
                    label="Skill Level"
                    id="level"
                    required
                    value={skillField.skillLevel}
                    onChange={event => handleChangeInput(index, event)}
                  >
                    <option value='Expert'>Expert</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                    <option value='Novice'>Novice</option>
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
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit">
            <ProfileIcon />
            Create Profile
          </Button>
        </form>

        <img src="https://media.giphy.com/media/Lg8DWFsoAAUqjv33Bg/giphy.gif" id="hiddenEasterEgg2" alt="beekeepers"></img>
        <img src="https://media.giphy.com/media/l0MYzM6y7jcx0hkR2/giphy.gif" id="hiddenEasterEgg3" alt="skateboarders"></img>

      </Container>
    </div>
  )
}


export default Create;