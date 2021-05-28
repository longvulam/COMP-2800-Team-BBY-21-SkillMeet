/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import { useContext, useEffect, useState } from 'react';
import UserSearchCard from './searchComponents/UserSearchCard';
import Grid from '@material-ui/core/Grid';
import { db, waitForCurrentUser } from '../firebase';
import { SearchSettingsContext } from './searchComponents/SearchSettingsContext';
import { searchStyles } from '../common/PageStyles';
import SkillsAutoComplete from './searchComponents/SkillsAutoComplete';

/**
 * Functional component built using Material UI components to create a search bar, 
 * which is used to query firestore to find users with the searched skill.  
 */
export default function SearchPage() {
    const classes = searchStyles();
    const searchSettings = useContext(SearchSettingsContext);
    const havePrevSettings = !!searchSettings.skills;
    const initialState = havePrevSettings ? searchSettings.skills : [];
    const [searchedSkills, setSearchedSkills] = useState(initialState);
    const [searchedUsers, setSearchedUsers] = useState([]);

    /**
     * Checks to see if the user is returning to the search page, and 
     * if they are, renders what was previously shown.
     */
    useEffect(() => {
        if (havePrevSettings) {
            getUsersFromSkillSearch(searchedSkills, setSearchedUsers)
        }
    }, []);

    return (
        <div>
            <div className={classes.searchWrap}>
                <SkillsAutoComplete
                    searchedSkills={searchedSkills}
                    setSearchedSkills={setSearchedSkills}
                    setSearchedUsers={setSearchedUsers}
                    getUsersFromSkillSearch={() =>
                        getUsersFromSkillSearch(searchedSkills, setSearchedUsers)}
                />
            </div>

            <Grid container direction="column"
                spacing={1}
                className={classes.userContain} >

                {searchedUsers.map((user, index) => {

                    const { name, city, skillName, skillLevel, id, avatar, isFriending } = user;
                    return (
                        <Grid id={"user_" + index}
                            key={index}
                            item
                            xs={12}
                            className={classes.cardContain}>
                                
                            <UserSearchCard
                                name={name}
                                city={city}
                                skillName={skillName}
                                skillLevel={skillLevel}
                                id={id}
                                avatar={avatar}
                                isFriending={isFriending}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}


/**
 * gets the users that have skills that match the skills that another user
 * has searched for by querying firestore.
 * @param {*} searchedSkills an array of skills that the user searched for
 * @param {*} setSearchedUsers a function used to set the searchedUsers array in state
 * @returns a userFriend obj with an id, name, city, avatar, skillName, skillLevel, and 
 *          boolean indicating if users are friends/pending friends.
 */
async function getUsersFromSkillSearch(searchedSkills, setSearchedUsers) {
    if (searchedSkills.length <= 0) { return }

    const userSkillDocs = [];
    const userRefDocs = [];

    const snapshots = await db.collectionGroup('Skills')
        .where('skillName', 'in', searchedSkills)
        .get();

    /**
     * gets a ref of the parent document.
     * I found the idea for this code on stackoverflow.com
     * 
     * @author Frank Van Puffelen
     * @see https://stackoverflow.com/questions/56219469/firestore-get-the-parent-document-of-a-subcollection
     */
    snapshots.forEach(userSkillDoc => {
        userSkillDocs.push(userSkillDoc.data());
        userRefDocs.push(userSkillDoc.ref.parent.parent)
    });

    const userInfoDocs = await Promise.all(userRefDocs.map(userRef =>
        userRef.get().then(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        })
    ));

    const currentUser = await waitForCurrentUser();
    const userFriendsRef = await db.collection('users').doc(currentUser.uid)
        .collection('Friends').get();

    const userFriendsList = userFriendsRef.docs.map(userFriend => userFriend.data());

    const users = userInfoDocs.map((userInfo, i) => {
        const userFriend = userFriendsList.find(friend => friend.friendID === userInfo.id);
        return {
            id: userInfo.id,
            name: userInfo.displayName,
            city: userInfo.city,
            avatar: userInfo.avatar,
            skillName: userSkillDocs[i].skillName,
            skillLevel: userSkillDocs[i].skillLevel,
            isFriending: userFriend ? true : false
        };
    });

    setSearchedUsers(users);
}
