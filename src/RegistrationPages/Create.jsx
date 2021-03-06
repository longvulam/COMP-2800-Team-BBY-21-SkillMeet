import React, { useState, useEffect } from "react";
import { db, auth, storage } from '../firebase';
import $ from "jquery";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { skillOptions } from '../dataStores/skills';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Grid, Button, IconButton, Fab } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import '../../src/LandingPageStyles/Landing_Page_Styles.css';
import { profileFormStyles } from "../common/PageStyles";


const Create = () => {
  const classes = profileFormStyles();
  const history = useHistory();

  const [user, setUser] = useState({
    uid: "",
    displayName: "",
    bio: "",
    city: "",
    avatarImageUrl: "",
  });

  /** Checks for user authentication after rendering components. */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(prev => {
          return {
            ...prev,
            uid: user.uid,
          }
        })
      }
    });
  }, []);

  const [skillFields, setSkillFields] = useState([
    { skillName: "", skillLevel: "Expert", skillDescription: "" },
  ])


  /** Handles the onChange method when the users enter their skills to their profile */
  let count = 0;
  const handleChangeInput = (index, event) => {
    const values = [...skillFields];
    values[index][event.target.name] = event.target.value;
    setSkillFields(values);

    /** Displaying an easter egg when the user enters beekeeping as their skill name and expert as their skill value */
    for (let i = 0; i < skillFields.length; i++) {
        const skill = skillFields[i];
        let isBeeKeeping = skill.skillName == "beekeeping";
        isBeeKeeping = isBeeKeeping || skill.skillName == "Beekeeping";
        const descEmpty = skill.skillDescription == "";
        const isExpert = skill.skillLevel == "Expert";
        if (count == 0 && isBeeKeeping && isExpert && descEmpty) {
            count++;
            $("#hiddenEasterEgg2").fadeIn(500, function () {
                window.setTimeout(function () { $('#hiddenEasterEgg2').hide(); }, 2500);
            });
        }
    }
  }

  /**
   * Handles the change made when selecting the skill name while adding skills to your profile.
   * @param {skillName} fieldName 
   * @param {String} newValue 
   * @param {num} index 
   */
  function searchedSkillUpdate(fieldName, newValue, index) {
    const currSkill = skillFields[index];
    currSkill[fieldName] = newValue;
    console.log('Onchange', skillFields);
    setSkillFields([...skillFields]);
    console.log('Skills Searched', skillFields);
  }

  /**
   * This function writes the data entered in the form to
   * the logged in user's firebase table.
   * Then directs the user to their profile page.
   * @param {submit event} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = db.collection('users').doc(user.uid);
    await userRef.update({
      displayName: user.displayName,
      bio: user.bio,
      city: user.city,
      avatar: user.avatarImageUrl
    })

    await Promise.all(skillFields.map((skill, i) => {
      userRef.collection("Skills").doc("Skill" + (i + 1)).set({
        "skillName": skill.skillName,
        "skillLevel": skill.skillLevel,
        "skillDescription": skill.skillDescription
      })
    }));

    history.push("/profile");
  };

  /** Adds another empty skill card for the user to fill and add a skill to their profile. */
  const handleAddFields = () => {
    setSkillFields(prevValues => [
      ...prevValues,
      {
        skillName: "", skillLevel: "", skillDescription: ""
      }])
  }

  /** Removes a skill card in case the user wants to delete it. */
  const handleRemoveFields = (index) => {
    const values = [...skillFields];
    if (values.length == 1) return;
    values.splice(index, 1);
    setSkillFields(values);
  }

  /** Reads the changes made on the profile image uploaded and updates the field. */
  const handleImageChange = async (event) => {
    const avatarImage = event.target.files[0];
    const storageRef = storage.ref();
    const avatarImageRef = storageRef.child(avatarImage.name);
    await avatarImageRef.put(avatarImage);
    const avatarImageUrl = await avatarImageRef.getDownloadURL();
    updateField(avatarImageUrl, 'avatarImageUrl');
  }

  /**
   * Updates the field for profile picture.
   * @param {String} value 
   * @param {skillName, skillLevel, skillDescription} fieldName 
   */
  function updateField(value, fieldName) {
    setUser(prev => {
      return {
        ...prev,
        [fieldName]: value,
      }
    });
  }

  /** Lets the user select an image to set as profile picture for our app. */
  const handleEditPicture = () => {
    const fileInput = document.getElementById('uploadImage');
    fileInput.click();
  }

  return (
    <div id="profile-form">
      <Container style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#1434A4', fontSize: '1.5em', padding: '5px', textAlign: 'center' }}>Please fill these details to complete your profile setup</h4>
        <form className={classes.root} onSubmit={handleSubmit}>

          <div className={classes.avatarWrap}>
            <Avatar
              id="avatarPic"
              alt="Profile Picture"
              src={user.avatarImageUrl}
              className={classes.avatar} />
          </div>
          <div>
            <input type="file" id="uploadImage" onChange={handleImageChange} hidden="hidden" />
            <Fab size="small" onClick={handleEditPicture} className={classes.editAvatarbtn}>
              <EditIcon />
            </Fab>
          </div>

          <TextField
            autoFocus
            label="Display Name"
            required
            variant="filled"
            name="displayName"
            id="nameInput"
            onChange={(e) => updateField(e.target.value, 'displayName')}
            inputProps={{
              'aria-label': 'naked',
              style: {
                textAlign: 'left',
                height: '2em',
                width: '50vw',
                border: 'none',
                backgroundColor: '#e3f6f5'
              }
            }}
          />

          <TextField
            id="city"
            label="City"
            name="city"
            required
            value={user.city}
            variant="filled"
            onChange={(e) => updateField(e.target.value, 'city')}
            inputProps={{
              style: {
                textAlign: 'left',
                height: '2em',
                width: '50vw',
                border: 'none',
                backgroundColor: '#e3f6f5'
              }
            }}
          />

          <TextField
            multiline
            rows={4}
            id = "level"
            label="Bio"
            required
            value={user.bio}
            variant="outlined"
            className = {classes.bioInput}
            onChange={(e) => updateField(e.target.value, 'bio')}
            />

          {skillFields.map((skillField, index) => (
            <div key={index}>
              <Grid container spacing={1} style={{
                margin: 'auto',
                marginTop: '2vh',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#E8E8E8',
                borderRadius: '5px'
              }}>
                <p style={{ color: '#1434A4', fontSize: '1.4em', padding: '5px', textAlign: 'center' }}>Add a skill to your profile:</p>

                <Grid item xs={12}>
                  <Autocomplete
                    id="combo-box-demo"
                    name="skillName"
                    className={classes.inputRoot}
                    options={skillOptions}
                    value={skillField.skillName}
                    onChange={(e, newVal) => searchedSkillUpdate('skillName', newVal, index)}
                    disableClearable
                    forcePopupIcon={false}
                    renderInput={params => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps
                          }}
                        />
                      );
                    }}
                  />

                </Grid>
                <Grid item xs={12} style={{
                  marginLeft: "2vw"
                }}>

                  <InputLabel id="level">Skill Level</InputLabel>
                  <Select
                    native
                    className = {classes.levelInput}
                    name="skillLevel"
                    label="Skill Level"
                    id="level"
                    required
                    value={skillField.skillLevel}
                    onChange={event => handleChangeInput(index, event)}
                  >
                    <option value='Novice'>Novice</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value='Expert'>Expert</option>

                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    name="skillDescription"
                    label="Skill Description"
                    placeholder="Enter anything you would like to share with others related to the skill:"
                    required
                    className = {classes.skillDescInput}
                    variant="outlined"
                    value={skillField.skillDescription}
                    onChange={event => handleChangeInput(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>

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
            id='create-profile-button'
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