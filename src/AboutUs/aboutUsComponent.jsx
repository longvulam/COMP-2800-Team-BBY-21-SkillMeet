import React, { Component } from 'react';
import HeroImage from './heroImageComponent';
import Mission from './missionComponent';
import Team from './ourTeamComponent';
import ContactUs from './contactUsComponent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
library.add(fas);

function handleLogout (){

}

class AboutUs extends Component {
    render() { 
        return (<div>
            <Navbar handleLogout = {handleLogout} />
            <HeroImage />
            <Mission />
            <Team />
            <ContactUs />
        </div>);
    }
}
 
export default AboutUs;