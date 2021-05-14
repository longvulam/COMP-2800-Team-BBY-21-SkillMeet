import React, {useState, useEffect} from "react";
import firebase from '../firebase';
import {db, auth} from '../firebase';

const Create = () => {

const [bio, setBio] = useState('');
const [city, setCity] = useState('');

// const writingData = (bio, city) => {
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         db.collection("users").doc(user.uid)
//             .update({
//                 "Bio": bio,
//                 "CIty": city,
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
// })
// }

    return ( 

        <div className = "create-profile-form">
                <form action="/profile">
                  <fieldset>
                    <legend>Fill the leftout fields to complete profile setup:</legend>
            
                    <label>Display Name:</label>
                    <input type="text"  autoFocus placeholder = "Trevor Noah" />
            
                    <label>Bio:</label>
                    <textarea 
                      className = "bioInfo" 
                      value = {bio} 
                      placeholder="What is your dream job? What is your favourite dish? Any successfull people you look up to? Anything you would like to share with others, go off on here!!" 
                      name="bio" 
                      id="bio"
                      onChange = {(e) => setBio(e.target.value)}>
                    </textarea>

                    <label>City Name:</label>
                    <input 
                      type="text" 
                      placeholder="Surrey" 
                      id="city" 
                      name="city"
                      value = {city} 
                      onChange = {(e) => setCity(e.target.value)}
                      />

                    <label>Enter your 3 top skills</label>

                    <div id = "skillContent">
                      <div className = "skillBox">
                        <label>1st Skill Name:</label>
                        <input type ="text" placeholder = "Coding in java" id = "skillOneName"></input><br/>
                        <label>Select your level:</label>
                        <select id="levelOne" name = "skillOneLevel">
                          <option value="Expert">Expert</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginneer">Begineer</option>
                        </select><br></br>
                        <label>Skill Description:</label>
                        <textarea id = "skillOneInfo" placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"></textarea>
                      </div>

                      <div className = "skillBox">
                        <label>2nd Skill Name:</label>
                        <input type ="text" placeholder = "Horse Riding" id = "skillTwoName"></input><br/>
                        <label>Select your level:</label>
                        <select id="levelOne" name = "skillOneLevel">
                          <option value="Expert">Expert</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginneer">Begineer</option>
                        </select><br></br>
                        <label>Skill Description:</label>
                        <textarea id = "skillTwoInfo" placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"></textarea>
                      </div>

                      <div className="skillBox">
                        <label>3rd Skill Name:</label>
                        <input type ="text" placeholder = "Beekeeping" id = "skillThreeName"></input><br/>
                        <label>Select your level:</label>
                        <select id="levelOne" name = "skillOneLevel">
                          <option value="Expert">Expert</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginneer">Begineer</option>
                        </select><br></br>
                        <label>Skill Description:</label>
                        <textarea id = "skillThreeInfo" placeholder="What inspired yout to start learning this skill? How did you get started with learning it? Anything you would like to share related to the skill, go off here!!"></textarea>
                      </div>
                    </div>


                    <input type = "submit" className = "createProfileBtn" value = "Create Profile" />
            
                  </fieldset>
                </form>
              </div>
     );
}
 
export default Create;