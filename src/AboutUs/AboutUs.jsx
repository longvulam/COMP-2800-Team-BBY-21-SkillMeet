
/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React, { Component } from 'react';
import PublicRoute from '../common/PublicRoute';
import HeroImage from './aboutUsComponents/HeroImage';
import Mission from './aboutUsComponents/Mission';
import Team2 from './aboutUsComponents/OurTeam';
import ContactUs from './aboutUsComponents/ContactUs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DustinPic from '../img/dustinPic.jpg';
import LamPic from '../img/lamPic.jpg';
import ArunabPic from '../img/arunabPic.jpg';
import OwenPic from '../img/owenPic.jpg';
import Grid from '@material-ui/core/Grid';


library.add(fas);

/** handles the logout based on PublicRoute */
function handleLogout() {

}

/**
 * class component that creates the AboutUs Page by displaying a hero image, a mission
 * statement, our team info, and contact info.
 */
class AboutUs extends Component {
    render() {
        const data = teamData;
        return (<div style={{ marginTop: '-.5em', width: '100vw' }}>
            <PublicRoute handleLogout={handleLogout} />
            <HeroImage />
            <Mission />
            <div style={{ textAlign: 'center', border: '1px solid black', backgroundColor: 'black', marginBottom: '3rem' }}>
                <h1 style={{ color: 'lightblue', marginTop: '1.5rem', marginBottom: '1rem' }}>Our Team..</h1>
                <Grid container spacing={1} justify="center" style={{ width: '100vw' }}>
                    {data.map(card => {
                        const { memberPic, memberName, memberBio } = card;
                        console.log('memberPic', memberPic)
                        return (
                            <Grid item xs={6} justify="center" alignItems="center"  >
                                <Team2
                                    memberPic={memberPic}
                                    memberName={memberName}
                                    memberBio={memberBio}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <ContactUs />
        </div>);
    }
}

export default AboutUs;



const teamData = [
    {
        memberPic: DustinPic,
        memberName: 'Dustin Lott',
        memberBio: `Dustin a new member to the team.  He brings energy and hardwork, 
      and is a welcomed asset to our company.`,
    },
    {
        memberPic: LamPic,
        memberName: 'Lam Long Vu',
        memberBio: `Lam brings knowledge and experience to our team.  He is a 
      quick thinker and excellent developer.`,
    },
    {
        memberPic: ArunabPic,
        memberName: 'Arunab Singh',
        memberBio: `Arunab is a great asset to our team, and we are happy to have him.
        He brings skills and tenacity to the team.`,
    },
    {
        memberPic: OwenPic,
        memberName: 'Owen Arando',
        memberBio: `Owen is a smart hardworking developer, and were glad he's joined our
       team.  He is driven and passionate.`,
    },
]