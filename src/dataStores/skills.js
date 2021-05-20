import { auth, db, getCurrentUserDataAsync } from '../firebase';

export const skillOptions = [];
export const skillLevelOptions = [];

async function loadSkillsAsync() {
    db.collection("userSkills").get()
    .then(querySs => querySs.forEach(doc => skillOptions.push(doc.data().name)));
    
    db.collection("userSkillLevels").get()
    .then(querySs => querySs.forEach(doc => skillLevelOptions.push(doc.data().name)));
}

loadSkillsAsync();