import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import { db } from '../firebase';
import '../../src/LandingPageStyles/Landing_Page_Styles.css';

const Create = () => {

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  const [skillOneName, setSkillOneName] = useState('');
  const [skillOneLevel, setSkillOneLevel] = useState('');
  const [skillOneDesc, setSkillOneDesc] = useState('');

  const [skillTwoName, setSkillTwoName] = useState('');
  const [skillTwoLevel, setSkillTwoLevel] = useState('');
  const [skillTwoDesc, setSkillTwoDesc] = useState('');

  const [skillThreeName, setSkillThreeName] = useState('');
  const [skillThreeLevel, setSkillThreeLevel] = useState('');
  const [skillThreeDesc, setSkillThreeDesc] = useState('');

  const addUserDetails = () => {




    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid)
          .update({
            "Bio": bio,
            "cityName": city,
            "displayName": displayName,
          })
      }
    });

    addSkills();
  }

  const addSkills = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid).collection("Skills").doc("skill1").set({
          "skillName": skillOneName,
          "skillLevel": skillOneLevel,
          "skillDescription": skillOneDesc,
        }).catch((err) => {
          console.log(err)
        })

        db.collection('users').doc(user.uid).collection("Skills").doc("skill2").set({
          "skillName": skillTwoName,
          "skillLevel": skillTwoLevel,
          "skillDescription": skillTwoDesc,
        }).catch((err) => {
          console.log(err)
        })

        db.collection('users').doc(user.uid).collection("Skills").doc("skill3").set({
          "skillName": skillThreeName,
          "skillLevel": skillThreeLevel,
          "skillDescription": skillThreeDesc,
        }).catch((err) => {
          console.log(err)
        })

      }
    }).then(window.location.href = "/profile");
  }

  return (

    <div className="create-profile-form">
      <form>
        <fieldset>
          <legend>Fill the leftout fields to complete profile setup:</legend>

          <label>Display Name:</label>
          <input type="text"
            autoFocus
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <label>Bio:</label>
          <textarea
            className="bioInfo"
            value={bio}
            placeholder="What is your dream job? What is your favourite dish? Any successfull people you look up to? Anything you would like to share with others, go off on here!!"
            name="bio"
            id="bio"
            onChange={(e) => setBio(e.target.value)}>
          </textarea>

          <label>City Name:</label>
          <input
            type="text"
            placeholder="Surrey"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>Enter your 3 top skills</label>

          <div id="skillContent">
            <div className="skillBox">
              <label>1st Skill Name:</label>
              <input type="text"
                id="skillOneName"
                value={skillOneName}
                onChange={(e) => setSkillOneName(e.target.value)}
              /><br />
              <label>Select your level:</label>
              <select name="skillOneLevel" value={skillOneLevel} onChange={(e) => setSkillOneLevel(e.target.value)}>
                <option value="Expert">Expert</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginneer">Begineer</option>
              </select><br></br>
              <label>Skill Description:</label>
              <textarea
                id="skillOneInfo"
                placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"
                value={skillOneDesc}
                onChange={(e) => setSkillOneDesc(e.target.value)}>
              </textarea>
            </div>

            <div className="skillBox">
              <label>2nd Skill Name:</label>
              <input type="text"
                value={skillTwoName}
                onChange={(e) => setSkillTwoName(e.target.value)}
                id="skillTwoName">
                </input><br />
              <label>Select your level:</label>
              <select name="skillTwoLevel" value={skillTwoLevel} onChange={(e) => setSkillTwoLevel(e.target.value)}>
                <option value="Expert">Expert</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginneer">Begineer</option>
              </select><br></br>
              <label>Skill Description:</label>
              <textarea 
                id="skillTwoInfo" 
                placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"
                value={skillTwoDesc}
                onChange={(e) => setSkillTwoDesc(e.target.value)}>
                </textarea>
            </div>

            <div className="skillBox">
              <label>3rd Skill Name:</label>
              <input type="text"
                id="skillThreeName"
                value={skillThreeName}
                onChange={(e) => setSkillThreeName(e.target.value)}>
                </input><br/>
              <label>Select your level:</label>
              <select name="skillThreeLevel" value={skillThreeLevel} onChange={(e) => setSkillThreeLevel(e.target.value)}>
                <option value="Expert">Expert</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginneer">Begineer</option>
              </select><br></br>
              <label>Skill Description:</label>
              <textarea id="skillThreeInfo"
                placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"
                value={skillThreeDesc}
                onChange={(e) => setSkillThreeDesc(e.target.value)}>
                </textarea>
            </div>
          </div>


          <input type="button" className="createProfileBtn" onClick={addUserDetails} value="Create Profile" />

        </fieldset>
      </form>
    </div>
  );
}

export default Create;